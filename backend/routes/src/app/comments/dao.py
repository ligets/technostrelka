from src.app.comments.models import CommentModel, AnswerModel
from src.app.comments.schemas import CommentCreateDB, AnswerCreateDB
from src.base_dao import BaseDAO


class CommentDAO(BaseDAO[CommentModel, CommentCreateDB, None]):
    model = CommentModel


class AnswerDAO(BaseDAO[AnswerModel, AnswerCreateDB, None]):
    model = AnswerModel
