import uuid

from pydantic import BaseModel, Field


class CommentCreate(BaseModel):
    route_id: uuid.UUID
    text: str
    rating: int = Field(..., ge=1, le=5)
