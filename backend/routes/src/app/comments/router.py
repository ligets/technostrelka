from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from src.database import db
from src.dependencies import get_current_user

router = APIRouter()


@router.post("/")
async def create_comments(

        user: dict = Depends(get_current_user),
        session: AsyncSession = Depends(db.get_async_session)
):
    # TODO: пустой
    pass


@router.post("/answer")
async def create_answer():
    # TODO: пустой
    pass

