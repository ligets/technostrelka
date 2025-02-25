import uuid
from datetime import date

from sqlalchemy import UUID, String, Date
from sqlalchemy.orm import Mapped, mapped_column

from src.base_model import Base


class NotificationModel(Base):
    __tablename__ = 'notifications'

    id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True, default=uuid.uuid4)
    email: Mapped[str] = mapped_column(String, index=True)
    events_id: Mapped[uuid.UUID] = mapped_column(UUID)
    events_name: Mapped[str] = mapped_column(String)
    start_date: Mapped[date] = mapped_column(Date)
