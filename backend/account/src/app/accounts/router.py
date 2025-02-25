import uuid

from fastapi import APIRouter, Depends, Query, UploadFile, File
# from fastapi_cache.decorator import cache
from sqlalchemy.ext.asyncio import AsyncSession

from src.config import S3Client
from src.database import db
from src.dependencies import get_current_user, get_current_admin
from src.app.accounts.models import UserModel
from src.app.accounts.schemas import UserDb, UserUpdate, UserCreateAdmin, UserUpdateAdmin
from src.app.accounts.service import UserService
from src import responses

router = APIRouter()


@router.get("/Me", response_model=UserDb, responses={
    401: responses.full_401
})
async def get_user_info(
        user: UserModel = Depends(get_current_user)
):
    return user


@router.put("/Update", response_model=UserDb, responses={
    401: responses.full_401,
    409: responses.username_409
})
async def update_user_info(
        data: UserUpdate,
        user: UserModel = Depends(get_current_user),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await UserService.update_user(user.id, data, session)


@router.get("", response_model=list[UserDb], responses={
    401: responses.full_401,
    403: responses.full_403
})
# @cache(expire=30)
async def get_list_users_info(
        offset: int = Query(..., alias="from"),
        count: int = Query(...),
        admin: UserModel = Depends(get_current_admin),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await UserService.get_list_users(offset=offset, limit=count, session=session)


@router.post("", response_model=UserDb, responses={
    401: responses.full_401,
    403: responses.full_403,
    409: responses.username_409
})
async def create_user(
        data: UserCreateAdmin,
        admin: UserModel = Depends(get_current_admin),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await UserService.create_user(data, session)


@router.put("/{id}", response_model=UserDb, responses={
    401: responses.full_401,
    403: responses.full_403,
    404: responses.user_404,
    409: responses.username_409
})
async def update_user_by_id(
        id: uuid.UUID,
        data: UserUpdateAdmin,
        admin: UserModel = Depends(get_current_admin),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await UserService.update_user(id, data, session)


@router.delete("/{id}", responses={
    401: responses.full_401,
    404: responses.doctor_404
})
async def delete_user_by_id(
        id: uuid.UUID,
        session: AsyncSession = Depends(db.get_async_session),
        admin: UserModel = Depends(get_current_admin),
):
    await UserService.delete_user(id, session)


@router.post('/asd')
async def asd(
    file: UploadFile = File(...)
):
    file_bytes = await file.read()
    object_name = file.filename
    s3_client = S3Client(
        access_key="06d86f59c8af4747b16f52627951982f",
        secret_key="507b17133a4846658aa93e73b8a72921",
        endpoint_url="https://s3.storage.selcloud.ru",
        bucket_name="mihest-public"
    )
    await s3_client.upload_file(file=file_bytes, object_name=object_name)

