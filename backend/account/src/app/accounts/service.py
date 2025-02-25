import uuid
from typing import Optional

from fastapi import HTTPException, status
from sqlalchemy import and_
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.accounts.dao import UserDAO
from src.dependencies import send_forgot
from src.app.accounts.models import UserModel
from src.app.accounts.schemas import UserUpdate, UserUpdateDB, UserUpdateAdmin, \
    UserCreate, UserCreateAdmin, UserCreateDB
from src.app.authentication.utils import get_password_hash


class UserService:
    @classmethod
    async def create_user(
            cls,
            data: UserCreate | UserCreateAdmin,
            session: AsyncSession
    ):
        if data.password != data.confirm_password:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match")
        return await UserDAO.add(
            session,
            UserCreateDB(
                **data.model_dump(exclude={"password", "confirm_password"}),
                hashed_password=get_password_hash(data.password)
            )
        )

    @classmethod
    async def get_user(cls, user_id: uuid.UUID, session: AsyncSession) -> UserModel:
        user = await UserDAO.find_one_or_none(session, UserModel.id == user_id)
        if not user or user.is_deleted:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
        return user

    @classmethod
    async def update_user(cls, user_id: uuid.UUID, user: UserUpdate | UserUpdateAdmin, session: AsyncSession):
        # Получаем текущего пользователя
        current_user = await cls.get_user(user_id, session)

        # Если email совпадает с текущим, не обновляем его
        if user.email == current_user.email:
            user.email = None

        hashed_password: Optional[str] = None

        # Проверка наличия нового пароля
        if user.password and len(user.password) > 0:
            # Проверка подтверждения пароля
            if not user.confirm_password:
                raise ValueError("Confirm password is required.")
            if user.password != user.confirm_password:
                raise ValueError("Password and confirm_password do not match.")

            # Хэшируем пароль
            hashed_password = get_password_hash(user.password)

        # Подготовка данных для обновления
        user_data = user.model_dump(
            exclude={"password", "confirm_password"},
            exclude_none=True
        )

        # Устанавливаем новое значение поля `hashed_password`, если пароль был изменён
        user_update = await UserDAO.update(
            session,
            and_(UserModel.id == user_id, UserModel.is_deleted == False),
            obj_in=UserUpdateDB(
                **user_data,
                hashed_password=hashed_password,
                is_verify=(
                    current_user.is_verify
                    if not user.email or current_user.email == user.email
                    else False
                )
            )
        )

        if not user_update:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

        return user_update

    @classmethod
    async def get_list_users(cls, offset: int, limit: int, session: AsyncSession, ):
        return await UserDAO.find_all(session, UserModel.is_deleted == False, offset=offset, limit=limit)

    @classmethod
    async def delete_user(cls, user_id: uuid.UUID, session: AsyncSession):
        await UserDAO.update(session, UserModel.id == user_id, obj_in={'is_deleted': True})
