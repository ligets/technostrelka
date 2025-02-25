import uuid
from datetime import date, timedelta

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.cron import CronTrigger
from fastapi_mail import MessageSchema, MessageType
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.notification.dao import NotificationDAO
from src.app.notification.models import NotificationModel
from src.app.notification.schemas import CreateNotification
from src.config import fm
from src.database import db


class NotificationService:
    @classmethod
    async def create_notification(cls, session: AsyncSession, data: CreateNotification, events_id: uuid.UUID):
        return await NotificationDAO.add(session, {
            **data.model_dump(),
            "events_id": events_id
        })

    @classmethod
    async def delete_notification(cls, session: AsyncSession, notification_id: uuid.UUID):
        notification = await NotificationDAO.find_one_or_none(session, NotificationModel.id == notification_id)
        if notification:
            await NotificationDAO.delete(session, NotificationModel.email == notification.email)

    @classmethod
    async def start_scheduler(cls):
        cls.scheduler = AsyncIOScheduler()
        cls.scheduler.add_job(
            cls.send_notifications,
            CronTrigger(hour=8),  # Запуск ежедневно в 8 утра
            id="notifications",
            replace_existing=True
        )

    @classmethod
    async def stop_scheduler(cls):
        cls.scheduler.shutdown()

    @classmethod
    async def send_notifications(cls):
        await cls.send_email_days(3)
        await cls.send_email_days(1)
        await cls.send_email_days(0)

    @classmethod
    async def send_email_days(cls, days):
        async with db.session() as session:
            dates = date.today() + timedelta(days=days) if days != 0 else date.today()
            print(dates)
            res = await NotificationDAO.find_notify_day(session, days)
            for competition in res:
                emails = [competition.email]
                if emails:
                    message = MessageSchema(
                        subject="Напоминание о событие",
                        recipients=emails,
                        template_body={
                            "date": date,
                            "name": competition.events_name,
                            "url": f"https://mihest.ru/events/{competition.events_id}",
                            "cancel_url": f"https://mihest.ru/un/{competition.id}"
                        },
                        subtype=MessageType.html
                    )
                    await fm.send_message(message, template_name="mail.html")

    @classmethod
    async def send_forgot(cls, email: str, uuid: uuid.UUID):
        message = MessageSchema(
            subject="Сброс пароля",
            recipients=[email],
            template_body={
                "url": f"http://localhost:3000/forgot/{uuid}"
            },
            subtype=MessageType.html
        )
        await fm.send_message(message, template_name="forgot.html")

    @classmethod
    async def send_confirm(cls, email: str, uuid: uuid.UUID):
        message = MessageSchema(
            subject="Подтверждение почты",
            recipients=[email],
            template_body={
                "url": f"http://localhost:3000/confirm/{uuid}"
            },
            subtype=MessageType.html
        )
        await fm.send_message(message, template_name="confirm.html")

