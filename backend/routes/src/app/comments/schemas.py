import uuid

from pydantic import BaseModel


class CommentCreate(BaseModel):
    route_id: uuid.UUID
    text: str
    rating:
