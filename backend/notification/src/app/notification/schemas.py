import uuid
from datetime import date

from pydantic import BaseModel, EmailStr


class CreateNotification(BaseModel):
    email: EmailStr
    start_date: date
    events_name: str
