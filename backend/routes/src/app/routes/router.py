import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.routes.models import RouteStatus
from src.app.routes.schemas import RouteCreate, RouteUpdate, FilterParams
from src.app.routes.service import RouteService
from src.database import db
from src.dependencies import get_current_user, get_current_admin

router = APIRouter()


@router.post("/", status_code=201)
async def create_routes(
        data: RouteCreate,
        user: dict = Depends(get_current_user),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.create_route(data, user, session)


@router.get("/")
async def get_routes(
        filter_by: FilterParams = Depends(),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.get_routes(session, filter_by)


@router.get("/user")
async def get_routes_user(
        user: dict = Depends(get_current_user),
        filter_by: FilterParams = Depends(),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.get_routes_user(session, filter_by, user)


@router.get("/user/saved")
async def get_routes_user_saved(
        user: dict = Depends(get_current_user),
        filter_by: FilterParams = Depends(),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.get_routes_user_saved(session, filter_by, user)


@router.get("/moderation")
async def get_moderation_queue(
        user: dict = Depends(get_current_admin),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.get_moderation_queue(session)


@router.post("/{id}/approve")
async def approve_route(
        id: uuid.UUID,
        user: dict = Depends(get_current_admin),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.edit_status_route(session, RouteStatus.APPROVED, id)


@router.post("/{id}/reject")
async def reject_route(
        id: uuid.UUID,
        user: dict = Depends(get_current_admin),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.edit_status_route(session, RouteStatus.REJECTED, id)


@router.get("/{id}/save")
async def get_route_by_id(
        id: uuid.UUID,
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.add_save_route(session, id)


@router.get("/{id}")
async def get_route_by_id(
        id: uuid.UUID,
        user: dict = Depends(get_current_user),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.get_route_by_id(session, id, user)


@router.get("/{id}/points")
async def get_route_points_by_id(
        id: uuid.UUID,
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.get_route_points_by_id(session, id)


@router.patch("/{id}")
async def patch_route_by_id(
        id: uuid.UUID,
        data: RouteUpdate,
        user: dict = Depends(get_current_user),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.update_route(session, data, id, user)


@router.delete("/{id}")
async def delete_route_by_id(
        id: uuid.UUID,
        user: dict = Depends(get_current_user),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await RouteService.delete_route_by_id(session, user, id)
