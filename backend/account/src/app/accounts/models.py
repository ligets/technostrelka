import uuid
from typing import List

from sqlalchemy import String, Boolean, UUID, Table, ForeignKey, Column, Integer, BigInteger
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.base_model import Base


class UserModel(Base):
    __tablename__ = 'users'
    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    first_name: Mapped[str] = mapped_column(String)

    hashed_password: Mapped[str] = mapped_column(
        String(1024), nullable=False
    )
    is_verify: Mapped[bool] = mapped_column(Boolean, default=False)
    is_deleted: Mapped[bool] = mapped_column(Boolean, default=False)

    role_id: Mapped[int] = mapped_column(Integer, ForeignKey(
        "roles.id", ondelete="CASCADE"))

    role: Mapped["RoleModel"] = relationship(
        "RoleModel",
        back_populates="users"
    )
    refresh_sessions: Mapped[List["RefreshSessionModel"]] = relationship(
        "RefreshSessionModel",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
    confirm_sessions: Mapped[List["ConfirmSessionModel"]] = relationship(
        "ConfirmSessionModel",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
    reset_sessions: Mapped[List["ResetSessionModel"]] = relationship(
        "ResetSessionModel",
        back_populates="user",
        cascade="all, delete-orphan",
        passive_deletes=True
    )


class RoleModel(Base):
    __tablename__ = 'roles'
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(30), unique=True, nullable=False)

    users: Mapped[List["UserModel"]] = relationship(
        "UserModel",
        back_populates="role",
        cascade="all, delete",
        passive_deletes=True
    )
