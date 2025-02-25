import uuid
from datetime import timedelta, datetime, timezone

import jwt
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import settings
from src.app.accounts.dao import UserDAO
from src.app.authentication.dao import RefreshSessionDAO, ResetSessionDAO, ConfirmSessionDAO
from src.dependencies import get_current_user, send_forgot, send_verify
from src.exceptions.AuthExceptions import InvalidToken, TokenExpiredException, InvalidCredentialsException
from src.app.accounts.models import UserModel
from src.app.authentication.models import RefreshSessionModel, ResetSessionModel, ConfirmSessionModel
from src.app.authentication.schemas import Token, RefreshSessionCreate, RefreshSessionUpdate, ForgotConfirmData
from src.app.accounts.schemas import UserCreate
from src.app.accounts.service import UserService
from src.app.authentication.utils import is_valid_password, get_password_hash
from src.database import db


class AuthService:
    @classmethod
    async def sign_up(cls, data: UserCreate, session):
        user = await UserService.create_user(data, session)
        return await cls.create_token(user, session)

    @classmethod
    async def sign_in(cls, username: str, password: str, session: AsyncSession) -> Token:
        user: UserModel = await UserDAO.find_one_or_none(session, email=username)
        if user and not user.is_deleted and is_valid_password(password, user.hashed_password):
            return await cls.create_token(user, session)
        raise InvalidCredentialsException

    @classmethod
    async def sign_out(cls, access_token: str, session: AsyncSession):
        await RefreshSessionDAO.delete(session, RefreshSessionModel.access_token == access_token)

    @classmethod
    async def refresh_tokens(cls, session: AsyncSession, token: uuid.UUID):
        refresh_session: RefreshSessionModel = await RefreshSessionDAO.find_one_or_none(
            session,
            RefreshSessionModel.refresh_token == token
        )
        if refresh_session is None:
            raise InvalidToken
        if datetime.now(timezone.utc) >= refresh_session.created_at + timedelta(seconds=refresh_session.expires_in):
            await RefreshSessionDAO.delete(session, RefreshSessionModel.refresh_token == token)
            raise TokenExpiredException
        user = await UserDAO.find_one_or_none(session, UserModel.id == refresh_session.user_id)
        if not user or user.is_deleted:
            raise InvalidToken
        access_token = await cls._create_access_token(user)
        refresh_token = await cls._create_refresh_token()
        refresh_token_expires = timedelta(
            days=settings.auth_jwt.refresh_token_expire_days
        )
        await RefreshSessionDAO.update(
            session,
            RefreshSessionModel.refresh_token == refresh_session.refresh_token,
            obj_in=RefreshSessionUpdate(
                refresh_token=refresh_token,
                access_token=access_token,
                expires_in=refresh_token_expires.total_seconds()
            )
        )
        return Token(access_token=access_token, refresh_token=refresh_token, token_type='Bearer')

    @classmethod
    async def create_token(cls, user: UserModel, session: AsyncSession) -> Token:
        access_token = await cls._create_access_token(user)
        refresh_token_expires = timedelta(
            days=settings.auth_jwt.refresh_token_expire_days
        )
        refresh_token = await cls._create_refresh_token()

        await RefreshSessionDAO.add(
            session,
            RefreshSessionCreate(
                user_id=user.id,
                refresh_token=refresh_token,
                access_token=access_token,
                expires_in=refresh_token_expires.total_seconds()
            )
        )
        return Token(access_token=access_token, refresh_token=refresh_token, token_type='Bearer')

    @classmethod
    async def abort_all_sessions(cls, user_id: uuid.UUID, session: AsyncSession, ):
        await RefreshSessionDAO.delete(session, RefreshSessionModel.user_id == user_id)

    @classmethod
    async def _create_access_token(cls, user: UserModel) -> str:
        to_encode = {
            'sub': str(user.id),
            'role': user.role.name,
            'district_id': str(user.district_id),
            'is_deleted': user.is_deleted,
            'exp': datetime.now(timezone.utc) + timedelta(minutes=settings.auth_jwt.access_token_expire_minutes)
        }

        encoded_jwt = jwt.encode(
            to_encode,
            settings.auth_jwt.private_key_path.read_text(),
            algorithm=settings.auth_jwt.algorithm
        )
        return encoded_jwt

    @classmethod
    async def _create_refresh_token(cls) -> str:
        return str(uuid.uuid4())

    @classmethod
    async def check_valid_token(cls, access_token):
        async with db.session() as session:
            await get_current_user(access_token, session)

    @classmethod
    async def forgot_password(cls, session_db: AsyncSession, email: str):
        user = await UserDAO.find_one_or_none(session_db, UserModel.email == email)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        session = await ResetSessionDAO.add(session_db, {"user_id": user.id})
        await send_forgot(session)

    @classmethod
    async def reset_password(cls, session: AsyncSession, token: str, data: ForgotConfirmData):
        reset_session = await ResetSessionDAO.find_one_or_none(session, ResetSessionModel.id == token)
        if not reset_session or datetime.now(timezone.utc) > reset_session.created_at + timedelta(minutes=5):
            raise HTTPException(status_code=401, detail="Token expired or invalid")
        if data.password != data.confirm_password:
            raise HTTPException(status_code=400, detail="Passwords do not match")
        user = await UserService.get_user(reset_session.user_id, session)
        user.is_verify = True
        reset_session.user.hashed_password = get_password_hash(data.password)
        await ResetSessionDAO.delete(session, ResetSessionModel.id == token)
        return await cls.create_token(user, session)

    @classmethod
    async def send_verify(cls, session_db: AsyncSession, user: UserModel):
        if user.is_verify:
            raise HTTPException(status_code=400, detail="Email already verified")
        session = await ConfirmSessionDAO.add(session_db, {"user_id": user.id})
        await send_verify(session)

    @classmethod
    async def verify(cls, session: AsyncSession, token: str):
        confirm_session = await ConfirmSessionDAO.find_one_or_none(session, ConfirmSessionModel.id == token)
        if not confirm_session or datetime.now(timezone.utc) > confirm_session.created_at + timedelta(minutes=5):
            raise HTTPException(status_code=401, detail="Token expired or invalid")
        user = await UserService.get_user(confirm_session.user_id, session)
        user.is_verify = True
        await ConfirmSessionDAO.delete(session, ConfirmSessionModel.id == token)
        return await cls.create_token(user, session)

