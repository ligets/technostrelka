import uuid

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from src.app.comments.dao import CommentDAO, AnswerDAO
from src.app.comments.models import CommentModel
from src.app.comments.schemas import CommentCreate, CommentCreateDB, AnswerCreate, AnswerCreateDB
from src.app.routes.dao import RouteDAO
from src.app.routes.models import RouteModel


class CommentService:
    @classmethod
    async def create_comment(cls, session: AsyncSession, data: CommentCreate, user: dict):
        route = await RouteDAO.find_one_or_none(session, RouteModel.id == data.route_id)
        if not route:
            raise HTTPException(status_code=404, detail="Route not found")
        return await CommentDAO.add(
            session,
            obj_in=CommentCreateDB(
                **data.model_dump(exclude_unset=True),
                author_id=user.get("sub")
            )
        )

    @classmethod
    async def create_answer(
            cls,
            session: AsyncSession,
            id: uuid.UUID,
            data: AnswerCreate,
            user: dict
    ):
        comment = await CommentDAO.find_one_or_none(session, CommentModel.id == id)
        if not comment:
            raise HTTPException(status_code=404, detail="Comment not found")
        return await AnswerDAO.add(
            session,
            AnswerCreateDB(
                **data.model_dump(exclude_unset=True),
                author_id=user.get("sub"),
                comment_id=id
            )
        )
