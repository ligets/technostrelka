import uuid
from typing import List, Optional
from pydantic import BaseModel, EmailStr


class RoleSchema(BaseModel):
    id: int
    name: str


class UserBase(BaseModel):
    email: EmailStr


class UserDb(BaseModel):
    id: uuid.UUID
    email: EmailStr
    first_name: str
    is_deleted: bool
    is_verify: bool

    role: RoleSchema

    model_config = {'from_attributes': True}


class UserCreate(BaseModel):
    email: EmailStr
    password: str
    confirm_password: str
    first_name: str


class UserCreateAdmin(UserCreate):
    role: str


class UserCreateDB(BaseModel):
    email: EmailStr
    first_name: str
    hashed_password: str
    role: Optional[str] = None


class UserUpdate(BaseModel):
    email: EmailStr
    first_name: str
    password: Optional[str] = None
    confirm_password: Optional[str] = None


class UserUpdateAdmin(UserUpdate):
    role: str


class UserUpdateDB(BaseModel):
    email: Optional[EmailStr] = None
    first_name: str
    is_verify: bool
    hashed_password: Optional[str] = None
    role: Optional[str] = None


class ResponseDoctor(BaseModel):
    id: uuid.UUID


