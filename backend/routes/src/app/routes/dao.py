import uuid
from typing import Union, Dict, Any, Optional

from fastapi import HTTPException
from sqlalchemy import insert, select, func, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload, selectinload

from src.app.comments.models import CommentModel
from src.app.routes.models import RouteModel, PointModel, RoutePhotosModel, SavedRouteModel
from src.app.routes.schemas import RouteCreateDB, RouteUpdateDB
from src.base_dao import BaseDAO


class RouteDAO(BaseDAO[RouteModel, RouteCreateDB, RouteUpdateDB]):
    model = RouteModel

    @classmethod
    async def add(
            cls,
            session: AsyncSession,
            obj_in: Union[RouteCreateDB, Dict[str, Any]],
    ) -> Optional[RouteModel]:
        if isinstance(obj_in, dict):
            create_data = obj_in
        else:
            create_data = obj_in.model_dump(exclude_unset=True)

        points = create_data.pop('points', None)
        photos = create_data.pop('photos', None)
        try:
            route = cls.model(**create_data, id=uuid.uuid4())
            route.points = [PointModel(**data, route_id=route.id) for data in points]
            route.photos = [RoutePhotosModel(photo_path=str(data), route_id=route.id) for data in photos]
            session.add(route)
            await session.commit()
            await session.refresh(route)
            await session.execute(
                select(RouteModel).options(
                    joinedload(RouteModel.points),
                    joinedload(RouteModel.photos),
                    joinedload(RouteModel.comments).options(
                        joinedload(CommentModel.answers)
                    )
                ).filter(RouteModel.id == route.id)
            )

            return route
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

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
            select(cls.model, func.avg(CommentModel.rating).label("rating"))
            .outerjoin(CommentModel, CommentModel.route_id == cls.model.id)
            .options(selectinload(cls.model.photos))
            .filter(*filters)
            .filter_by(**filter_by)
            .group_by(cls.model.id)
            .offset(offset)
            .limit(limit)
        )
        result = await session.execute(stmt)
        return [{"route": route, "rating": average_rating} for route, average_rating in result.all()]

    @classmethod
    async def find_all_saved(
            cls,
            session: AsyncSession,
            user_id: uuid.UUID,
            *filters,
            offset: int = 0,
            limit: int = 100,
            **filter_by
    ):

        stmt = (
            select(RouteModel, func.avg(CommentModel.rating).label("rating"))
            .outerjoin(CommentModel, CommentModel.route_id == cls.model.id)
            .options(selectinload(cls.model.photos))
            .join(SavedRouteModel, SavedRouteModel.route_id == RouteModel.id)
            .filter(*[*filters, SavedRouteModel.user_id == user_id])
            .filter_by(**filter_by)
            .group_by(cls.model.id)
            .offset(offset)
            .limit(limit)
        )
        result = await session.execute(stmt)
        return [{"route": route, "rating": average_rating} for route, average_rating in result.all()]

    @classmethod
    async def find_one_or_none(
            cls,
            session: AsyncSession,
            *filters,
            **filter_by
    ) -> Optional[RouteModel]:
        stmt = (
            select(cls.model, func.avg(CommentModel.rating).label("rating"))
            .outerjoin(CommentModel, CommentModel.route_id == cls.model.id)
            .options(
                selectinload(RouteModel.points),
                selectinload(RouteModel.photos),
                selectinload(RouteModel.comments).options(
                        selectinload(CommentModel.answers)
                    )
            )
            .filter(*filters)
            .filter_by(**filter_by)
            .group_by(cls.model.id)
        )
        result = await session.execute(stmt)
        row = result.mappings().first()  # Получаем только первый результат до закрытия
        if row:
            route = row[RouteModel]  # Извлекаем RouteModel
            route.rating = row.get("rating")  # Присваиваем рейтинг
            return route
        return None

    @classmethod
    async def update(
            cls,
            session: AsyncSession,
            *where,
            obj_in: Union[RouteUpdateDB, Dict[str, Any]],
    ) -> Optional[RouteModel]:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)

        photos = update_data.pop('photos', None)

        try:
            stmt = update(cls.model).where(*where).values(**update_data).returning(cls.model)
            result = await session.execute(stmt)
            route = result.scalars().one_or_none()
            if photos:
                route.photos = [RoutePhotosModel(photo_path=str(data), route_id=route.id) for data in photos]
                session.add_all(route.photos)
            await session.commit()
            await session.refresh(route)

            result = await session.execute(
                select(RouteModel).options(
                    selectinload(RouteModel.points),
                    selectinload(RouteModel.photos),
                    selectinload(RouteModel.comments).options(
                        selectinload(CommentModel.answers)
                    )
                ).filter(RouteModel.id == route.id)
            )
            route = result.scalars().one()

            return route

        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


class PointDAO(BaseDAO[PointModel, None, None]):
    model = PointModel


