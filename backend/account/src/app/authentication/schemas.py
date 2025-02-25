import uuid
from typing import Optional

from fastapi import Form
from pydantic import BaseModel, Field, EmailStr


class CredentialsJSON(BaseModel):
    email: str
    password: str


class CredentialsFormData(BaseModel):
    username: str = Form(...)
    password: str = Form(...)


class Token(BaseModel):
    access_token: str
    refresh_token: uuid.UUID
    token_type: str


class RefreshSessionCreate(BaseModel):
    refresh_token: uuid.UUID
    access_token: str
    expires_in: int
    user_id: uuid.UUID


class RefreshSessionUpdate(RefreshSessionCreate):
    user_id: Optional[uuid.UUID] = Field(None)


class Refresh(BaseModel):
    refreshToken: uuid.UUID


class ForgotData(BaseModel):
    email: EmailStr


class ForgotConfirmData(BaseModel):
    password: str
    confirm_password: str


class ResetSessionCreate(BaseModel):
    user_id: uuid.UUID


class ConfirmSessionCreate(BaseModel):
    user_id: uuid.UUID

