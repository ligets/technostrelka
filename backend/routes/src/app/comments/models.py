import uuid

from sqlalchemy import UUID, ForeignKey, String, Integer, CheckConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.base_model import Base


class CommentModel(Base):
    __tablename__ = 'comments'
    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    route_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey("routes.id", ondelete="CASCADE"),
        nullable=False
    )
    author_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        nullable=False
    )
    text: Mapped[str] = mapped_column(String, nullable=False)
    rating: Mapped[int] = mapped_column(Integer, CheckConstraint("rating BETWEEN 1 AND 5"), nullable=False)

    route: Mapped["RouteModel"] = relationship(
        "RouteModel",
        back_populates="comments"
    )

    answers: Mapped[list["AnswerModel"]] = relationship(
        "AnswerModel",
        back_populates="comment",
        cascade="all, delete-orphan",
        passive_deletes=True
    )


class AnswerModel(Base):
    __tablename__ = 'answers'
    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    comment_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        ForeignKey("comments.id", ondelete="CASCADE"),
        nullable=False
    )
    author_id: Mapped[uuid.UUID] = mapped_column(
        UUID,
        nullable=False
    )
    text: Mapped[str] = mapped_column(String, nullable=False)

    comment: Mapped["CommentModel"] = relationship(
        "CommentModel",
        back_populates="answers",
    )
