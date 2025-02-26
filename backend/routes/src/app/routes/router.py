from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.routes.schemas import RouteCreate
from src.app.routes.service import RouteService
from src.database import db
from src.dependencies import get_current_user

router = APIRouter()


@router.post("/", status_code=201)
async def create_routes(
        data: RouteCreate,
        user: dict = Depends(get_current_user),
        session: AsyncSession = Depends(db.get_async_session)
):
    # TODO document why this method is empty
    return await RouteService.create_route(data, user, session)


@router.get("/")
async def get_routes():
    # TODO document why this method is empty
    pass


@router.get("/user")
async def get_routes_user():
    # TODO document why this method is empty
    pass



@router.get("/user/saved")
async def get_routes_user_saved():
    # TODO document why this method is empty
    pass


@router.get("/{id}")
async def get_route_by_id():
    # TODO document why this method is empty
    pass


@router.get("/{id}/small")
async def get_small_route_by_id():
    # TODO document why this method is empty
    pass


@router.get("/{id}/points")
async def get_route_points_by_id():
    # TODO document why this method is empty
    pass


@router.put("/{id}")
async def put_route_by_id():
    # TODO document why this method is empty
    pass


@router.patch("/{id}")
async def patch_route_by_id():
    # TODO document why this method is empty
    pass


@router.delete("/{id}")
async def delete_route_by_id():
    # TODO document why this method is empty
    pass


@router.get("/moderation")
async def get_moderation_queue():
    # TODO document why this method is empty
    pass
