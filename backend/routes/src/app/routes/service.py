import base64
import os
import uuid

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.routes.dao import RouteDAO
from src.app.routes.models import RouteStatus
from src.app.routes.schemas import RouteCreate, RouteCreateDB
from src.app.routes.utils import upload_photo
from src.config import settings


class RouteService:
    @classmethod
    async def create_route(cls, data: RouteCreate, user: dict, session: AsyncSession):
        saved_files = []
        for i, photo in enumerate(data.photos):
            saved_files.append(await upload_photo(i, photo))
        del data.photos
        for i, points in enumerate(data.points):
            try:
                points.photo = (await upload_photo(i, points.photo)).__str__()
            except Exception as e:
                raise HTTPException(status_code=400, detail=f"Ошибка при обработке фото метки №{i}: {str(e)}")
        status = RouteStatus.MODERATION if data.is_public else RouteStatus.APPROVED
        route = RouteCreateDB(
            **data.model_dump(exclude_unset=True),
            photos=saved_files,
            status=status,
            owner_id=uuid.UUID(user.get("sub"))
        )
        return await RouteDAO.add(session, route)
