import uuid

from pydantic import BaseModel, Field


class CommentCreate(BaseModel):
    route_id: uuid.UUID
    text: str
    rating: int = Field(..., ge=1, le=5)


class CommentCreateDB(CommentCreate):
    author_id: uuid.UUID


class AnswerCreate(BaseModel):
    text: str


class AnswerCreateDB(AnswerCreate):
    author_id: uuid.UUID
    comment_id: uuid.UUID
