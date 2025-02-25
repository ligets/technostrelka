from datetime import date, timedelta

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.app.notification.models import NotificationModel
from src.app.notification.schemas import CreateNotification
from src.base_dao import BaseDAO


class NotificationDAO(BaseDAO[NotificationModel, CreateNotification, None]):
    model = NotificationModel

    @classmethod
    async def find_notify_day(cls, session: AsyncSession, day):
        if day == 0:
            date_ = date.today()
        else:
            date_ = date.today() + timedelta(days=day)

        stmt = (
            select(NotificationModel)
            .filter(NotificationModel.start_date == date_)
        )
        result = await session.execute(stmt)
        return result.scalars().all()
