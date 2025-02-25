from fastapi import APIRouter
from src.app.notification.router import router as router_notification


all_routers = APIRouter()

all_routers.include_router(
    router_notification,
    prefix='/Notification',
    tags=['Notification']
)

