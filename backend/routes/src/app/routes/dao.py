import uuid
from typing import Union, Dict, Any, Optional

from fastapi import HTTPException
from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import joinedload

from src.app.routes.models import RouteModel, PointModel, RoutePhotosModel
from src.app.routes.schemas import RouteCreateDB
from src.base_dao import BaseDAO


class RouteDAO(BaseDAO[RouteModel, RouteCreateDB, None]):
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
        print(photos)
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
                    joinedload(RouteModel.comments)
                ).filter(RouteModel.id == route.id)
            )

            return route
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
