from fastapi import APIRouter
from src.app.routes.router import router as router_routes
from src.app.comments.router import router as router_comments


all_routers = APIRouter()

all_routers.include_router(
    router_routes,
    prefix='/routes',
    tags=['Routes']
)

all_routers.include_router(
    router_comments,
    prefix='/comments',
    tags=['Comments']
)

