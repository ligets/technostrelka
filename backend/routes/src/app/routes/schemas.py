import uuid
from pathlib import Path

from pydantic import BaseModel, conlist

from src.app.routes.models import RouteType, RouteStatus


class PointCreate(BaseModel):
    name: str
    description: str
    coord_x: float
    coord_y: float
    photo: str


class RouteCreate(BaseModel):
    title: str
    description: str
    type: RouteType
    photos: conlist(str, min_length=1, max_length=3)
    is_public: bool
    points: conlist(PointCreate, min_length=2)


class RouteCreateDB(RouteCreate):
    photos: list[Path]
    status: RouteStatus
    owner_id: uuid.UUID

