import uuid

from fastapi import APIRouter, Depends
from pydantic import EmailStr
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.notification.schemas import CreateNotification
from src.app.notification.service import NotificationService
from src.database import db

router = APIRouter()


@router.delete('/{id}')
async def delete_notify(id: uuid.UUID, session: AsyncSession = Depends(db.get_async_session)):
    await NotificationService.delete_notification(session, id)


@router.post('/Events/{id}')
async def notification_competition(
        id: uuid.UUID, data: CreateNotification, session: AsyncSession = Depends(db.get_async_session)):
    await NotificationService.create_notification(session, data, id)
