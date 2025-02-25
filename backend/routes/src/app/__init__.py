from fastapi import APIRouter
from src.app.routes.router import router as router_routes


all_routers = APIRouter()

all_routers.include_router(
    router_routes,
    prefix='/routes',
    tags=['Routes']
)

