from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.base_dao import BaseDAO
from src.app.authentication.models import RefreshSessionModel, ResetSessionModel, ConfirmSessionModel
from src.app.authentication.schemas import RefreshSessionCreate, RefreshSessionUpdate, ResetSessionCreate, \
    ConfirmSessionCreate


class RefreshSessionDAO(BaseDAO[RefreshSessionModel, RefreshSessionCreate, RefreshSessionUpdate]):
    model = RefreshSessionModel


class ResetSessionDAO(BaseDAO[ResetSessionModel, ResetSessionCreate, None]):
    model = ResetSessionModel

    @classmethod
    async def find_one_or_none(
            cls,
            session: AsyncSession,
            *filters,
            **filter_by
    ) -> Optional[ResetSessionModel]:
        stmt = select(cls.model).options(selectinload(cls.model.user)).filter(*filters).filter_by(**filter_by)
        result = await session.execute(stmt)
        return result.scalars().one_or_none()


class ConfirmSessionDAO(BaseDAO[ConfirmSessionModel, ConfirmSessionCreate, None]):
    model = ConfirmSessionModel

    @classmethod
    async def find_one_or_none(
            cls,
            session: AsyncSession,
            *filters,
            **filter_by
    ) -> Optional[ConfirmSessionModel]:
        stmt = select(cls.model).options(selectinload(cls.model.user)).filter(*filters).filter_by(**filter_by)
        result = await session.execute(stmt)
        return result.scalars().one_or_none()




