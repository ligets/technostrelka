import uuid
from enum import Enum

from sqlalchemy import UUID, String, Boolean, Float, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import Enum as SQLAlchemyEnum

from src.app.comments.models import CommentModel
from src.base_model import Base


class RouteType(Enum):
    PEDESTRIAN = "Пеший"
    CAR = "Автомобильный"
    ORIENTEERING = "Спортивное ориентирование"
    ALPINISM = "Альпинизм"
    CYCLING = "Велосипедный маршрут"
    CAMPING = "Кемпинг"
    SKIING = "Лыжный маршрут"
    KAYAKING = "Байдарки"
    SUP_SURFING = "Сапсерфинг"
    DIVING = "Дайвинг"
    RAFTING = "Рафтинг"
    HORSEBACK_RIDING = "Верховая езда"
    SNOWMOBILE = "Снегоход"
    BUGGY = "Багги"
    ENDURO = "Эндуро"
    OFF_ROAD = "Внедорожник"
    TRAIN = "Поезд"


class RouteStatus(Enum):
    APPROVED = "Одобрено"
    REJECTED = "Отклонено"
    MODERATION = "На модерации"


class RouteModel(Base):
    __tablename__ = "routes"

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    type: Mapped[RouteType] = mapped_column(SQLAlchemyEnum(RouteType), nullable=False)
    is_public: Mapped[bool] = mapped_column(Boolean, nullable=False)
    status: Mapped[RouteStatus] = mapped_column(SQLAlchemyEnum(RouteStatus), nullable=False)
    # distance: Mapped
    owner_id: Mapped[uuid.UUID] = mapped_column(UUID, nullable=False)

    points: Mapped[list["PointModel"]] = relationship(
        "PointModel",
        back_populates="route",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
    photos: Mapped[list["RoutePhotosModel"]] = relationship(
        "RoutePhotosModel",
        back_populates="route",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
    comments: Mapped[list["CommentModel"]] = relationship(
        "CommentModel",
        back_populates="route",
        cascade="all, delete-orphan",
        passive_deletes=True
    )
    saved: Mapped[list["SavedRouteModel"]] = relationship(
        "SavedRouteModel",
        back_populates="route",
        cascade="all, delete-orphan",
        passive_deletes=True
    )


class PointModel(Base):
    __tablename__ = 'points'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    name: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    coord_x: Mapped[float] = mapped_column(Float, nullable=False)
    coord_y: Mapped[float] = mapped_column(Float, nullable=False)
    route_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey("routes.id", ondelete="CASCADE"), nullable=False)
    photo: Mapped[str] = mapped_column(String, nullable=False)

    route: Mapped["RouteModel"] = relationship("RouteModel", back_populates="points")


class RoutePhotosModel(Base):
    __tablename__ = 'route_photos'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    photo_path: Mapped[str] = mapped_column(String, nullable=False)
    route_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey("routes.id", ondelete="CASCADE"), nullable=False)

    route: Mapped["RouteModel"] = relationship("RouteModel", back_populates="photos")


class SavedRouteModel(Base):
    __tablename__ ='saved_routes'
    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(UUID, nullable=False)
    route_id: Mapped[uuid.UUID] = mapped_column(UUID, ForeignKey("routes.id", ondelete="CASCADE"), nullable=False)

    route: Mapped["RouteModel"] = relationship(
        "RouteModel",
        back_populates="saved"
    )
