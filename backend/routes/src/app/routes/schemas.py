import uuid
from pathlib import Path
from typing import Optional

from pydantic import BaseModel, conlist

from src.app.routes.models import RouteType, RouteStatus


class PointCreate(BaseModel):
    name: str
    description: Optional[str] = None
    coord_x: float
    coord_y: float
    photo: str


class RouteCreate(BaseModel):
    title: str
    description: str
    type: RouteType
    distance: float
    photos: conlist(str, min_length=1, max_length=3)
    is_public: bool
    points: conlist(PointCreate, min_length=2)


class RouteCreateDB(RouteCreate):
    photos: list[Path]
    status: RouteStatus
    owner_id: uuid.UUID


class RouteUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    type: Optional[RouteType] = None
    distance: Optional[float] = None
    is_public: Optional[bool] = None
    photos: Optional[conlist(str, min_length=1, max_length=3)] = None

    @classmethod
    def validate_non_empty(cls, values):
        if not any(values.values()):
            raise ValueError("At least one field must be provided")
        return values

    def model_post_init(self, __context):
        self.validate_non_empty(self.model_dump())


class RouteUpdateDB(RouteUpdate):
    status: RouteStatus
    photos: list[Path]


class FilterParams(BaseModel):
    title: Optional[str] = None
    type: Optional[RouteType] = None

