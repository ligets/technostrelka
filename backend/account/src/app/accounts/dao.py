from typing import Optional, Union, Dict, Any

from sqlalchemy import select, insert, update
from sqlalchemy.exc import SQLAlchemyError, IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from src.exceptions.DatabaseException import DatabaseException, UnknownDatabaseException, ConflictUniqueAttribute
from src.app.accounts.models import UserModel
from src.app.accounts.models import RoleModel
from src.app.accounts.schemas import UserCreateDB, UserUpdateDB
from src.base_dao import BaseDAO


class UserDAO(BaseDAO[UserModel, UserCreateDB, UserUpdateDB]):
    model = UserModel

    @classmethod
    async def find_one_or_none(
            cls,
            session: AsyncSession,
            *filters,
            **filter_by
    ) -> Optional[UserModel]:
        stmt = select(cls.model).options(selectinload(cls.model.role)).filter(*filters).filter_by(**filter_by)
        result = await session.execute(stmt)
        # print(result.all())
        return result.scalars().one_or_none()

    @classmethod
    async def find_all(
            cls,
            session: AsyncSession,
            *filters,
            offset: int = 0,
            limit: int = 100,
            **filter_by
    ):
        stmt = (
            select(cls.model)
            .options(selectinload(cls.model.role))
            .join(cls.model.role)
            .filter(*filters)
            .filter_by(**filter_by)
            .offset(offset)
            .limit(limit)
        )
        result = await session.execute(stmt)
        return result.scalars().all()

    @classmethod
    async def update(
            cls,
            session: AsyncSession,
            *where,
            obj_in: Union[UserUpdateDB, Dict[str, Any]],
    ) -> Optional[UserModel]:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            if not obj_in.hashed_password:
                del obj_in.hashed_password
            update_data = obj_in.model_dump(exclude_unset=True)

        # Извлекаем роль, если она есть
        role = update_data.pop("role", None)

        # Формируем запрос для обновления
        stmt = (
            update(cls.model)
            .where(*where)
            .values(**update_data)
            .returning(cls.model)
            .options(selectinload(cls.model.role))
        )
        result = await session.execute(stmt)
        updated_user = result.scalars().one_or_none()

        # Обновляем роль пользователя, если она указана
        if updated_user and role:
            new_role_query = await session.execute(
                select(RoleModel).where(RoleModel.name == role)
            )
            new_role = new_role_query.scalars().one_or_none()
            updated_user.role = new_role

        return updated_user

    @classmethod
    async def add(
            cls,
            session: AsyncSession,
            obj_in: Union[UserCreateDB, Dict[str, Any]],
    ) -> Optional[UserModel]:
        if isinstance(obj_in, dict):
            create_data = obj_in
        else:
            create_data = obj_in.model_dump(exclude_unset=True)

        role = create_data.pop("role", "User")

        try:
            role_query = await session.execute(select(RoleModel).where(RoleModel.name == role))
            role_obj = role_query.scalars().first()

            if not role_obj:
                raise ValueError(f"Role '{role}' does not exist.")

            # Добавление пользователя с ролью
            create_data["role_id"] = role_obj.id  # Связываем пользователя с ролью через role_id
            stmt = insert(cls.model).values(**create_data).returning(cls.model).options(selectinload(cls.model.role))
            result = await session.execute(stmt)
            user: UserModel = result.scalars().first()

            await session.commit()
            return user
        except IntegrityError as e:
            print(e)
            raise ConflictUniqueAttribute('Username is already taken.')
        except SQLAlchemyError as e:
            print(e)
            raise DatabaseException
        except Exception as e:
            print(e)
            raise UnknownDatabaseException
