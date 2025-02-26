import uuid

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.comments.schemas import CommentCreate, AnswerCreate
from src.app.comments.service import CommentService
from src.database import db
from src.dependencies import get_current_user

router = APIRouter()


@router.post("/")
async def create_comments(
        data: CommentCreate,
        user: dict = Depends(get_current_user),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await CommentService.create_comment(session, data, user)


@router.post("/{id}/answer")
async def create_answer(
        id: uuid.UUID,
        data: AnswerCreate,
        user: dict = Depends(get_current_user),
        session: AsyncSession = Depends(db.get_async_session)
):
    return await CommentService.create_answer(session, id, data, user)


