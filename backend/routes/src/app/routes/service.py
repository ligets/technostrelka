import uuid

from fastapi import HTTPException
from sqlalchemy import and_
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.routes.dao import RouteDAO, PointDAO
from src.app.routes.models import RouteStatus, RouteModel, PointModel
from src.app.routes.schemas import RouteCreate, RouteCreateDB
from src.app.routes.utils import upload_photo


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

    @classmethod
    async def get_routes(cls, session: AsyncSession):
        return await RouteDAO.find_all(session, [and_(RouteModel.is_public == True, RouteModel.status == RouteStatus.APPROVED)])

    @classmethod
    async def get_routes_user(cls, session: AsyncSession, user: dict):
        return await RouteDAO.find_all(session, RouteModel.owner_id == user.get("sub"))

    @classmethod
    async def get_routes_user_saved(cls, session: AsyncSession, user: dict):
        return await RouteDAO.find_all_saved(session, user_id=user.get("sub"))

    @classmethod
    async def get_route_by_id(cls, session: AsyncSession, route_id: uuid.UUID):
        route = await RouteDAO.find_one_or_none(session, RouteModel.id == route_id)
        if not route:
            raise HTTPException(status_code=404, detail="User not found")
        return route

    @classmethod
    async def get_route_points_by_id(cls, session: AsyncSession, route_id: uuid.UUID):
        return await PointDAO.find_all(session, PointModel.route_id == route_id)

    @classmethod
    async def get_moderation_queue(cls, session: AsyncSession):
        return await RouteDAO.find_all(session, RouteModel.status == RouteStatus.MODERATION)
