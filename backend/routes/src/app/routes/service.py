import uuid
from typing import Union

from fastapi import HTTPException
from sqlalchemy import and_
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.routes.dao import RouteDAO, PointDAO
from src.app.routes.models import RouteStatus, RouteModel, PointModel
from src.app.routes.schemas import RouteCreate, RouteCreateDB, RouteUpdateDB, RouteUpdate, FilterParams
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
    async def get_routes(cls, session: AsyncSession, filter_by: FilterParams):
        filters = [
            RouteModel.is_public == True,
            RouteModel.status == RouteStatus.APPROVED
        ]

        if filter_by.type:
            filters.append(RouteModel.type == filter_by.type)
        if filter_by.title:
            filters.append(RouteModel.title.ilike(f"%{filter_by.title}%"))

        return await RouteDAO.find_all(session, *filters)

    @classmethod
    async def get_routes_user(cls, session: AsyncSession, filter_by: FilterParams, user: dict):
        filters = [
            RouteModel.owner_id == user.get("sub")
        ]

        if filter_by.type:
            filters.append(RouteModel.type == filter_by.type)
        if filter_by.title:
            filters.append(RouteModel.title.ilike(f"%{filter_by.title}%"))

        return await RouteDAO.find_all(session, *filters)

    @classmethod
    async def get_routes_user_saved(cls, session: AsyncSession, filter_by: FilterParams, user: dict):
        filters = []

        if filter_by.type:
            filters.append(RouteModel.type == filter_by.type)
        if filter_by.title:
            filters.append(RouteModel.title.ilike(f"%{filter_by.title}%"))

        return await RouteDAO.find_all_saved(session, user_id=user.get("sub"), *filters)

    @classmethod
    async def get_route_by_id(cls, session: AsyncSession, route_id: uuid.UUID):
        route = await RouteDAO.find_one_or_none(session, RouteModel.id == route_id)
        if not route:
            raise HTTPException(status_code=404, detail="Route not found")
        return route

    @classmethod
    async def get_route_points_by_id(cls, session: AsyncSession, route_id: uuid.UUID):
        return await PointDAO.find_all(session, PointModel.route_id == route_id)

    @classmethod
    async def get_moderation_queue(cls, session: AsyncSession):
        return await RouteDAO.find_all(session, RouteModel.status == RouteStatus.MODERATION)

    @classmethod
    async def edit_status_route(
            cls,
            session: AsyncSession,
            status: Union[RouteStatus.APPROVED, RouteStatus.REJECTED],
            route_id: uuid.UUID
    ):
        update_route = await RouteDAO.update(
            session,
            and_(RouteModel.id == route_id, RouteModel.status == RouteStatus.MODERATION),
            obj_in={"status": status}
        )
        if not update_route:
            raise HTTPException(status_code=404, detail="Route not found or status is not moderation")
        return update_route

    @classmethod
    async def delete_route_by_id(
            cls,
            session: AsyncSession,
            user: dict,
            route_id: uuid.UUID
    ):
        route = await RouteDAO.find_one_or_none(session, RouteModel.id == route_id)
        if not route:
            raise HTTPException(status_code=404, detail="Route not found")
        if route.owner_id != uuid.UUID(user.get("sub")) and user.get("role") != "Admin":
            raise HTTPException(status_code=403, detail="Access denied")
        return await RouteDAO.delete(session, RouteModel.id == route_id)

    @classmethod
    async def update_route(
            cls,
            session: AsyncSession,
            data: RouteUpdate,
            route_id: uuid.UUID,
            user: dict
    ):
        route = await RouteDAO.find_one_or_none(session, RouteModel.id == route_id)
        if not route:
            raise HTTPException(status_code=404, detail="Route not found")
        if route.owner_id != uuid.UUID(user.get("sub")):
            raise HTTPException(status_code=403, detail="Access denied")

        if data.photos:
            saved_files = []
            for i, photo in enumerate(data.photos):
                saved_files.append(await upload_photo(i, photo))
            del data.photos

        is_public = data.is_public if data.is_public is not None else route.is_public
        status = RouteStatus.MODERATION if is_public else RouteStatus.APPROVED

        return await RouteDAO.update(
            session,
            RouteModel.id == route_id,
            obj_in=RouteUpdateDB(
                **data.model_dump(exclude_unset=True),
                status=status,
                photos=saved_files
            )
        )
