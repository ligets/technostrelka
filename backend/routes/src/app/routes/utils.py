import base64
import os
import uuid

from fastapi import HTTPException

from src.config import settings


async def upload_photo(i, photo: str):
    try:
        header, encoded = photo.split(",", 1)  # Отделяем мета-информацию (если есть)
        extension = "jpg" if "jpeg" in header else "png"  # Определяем формат

        file_name = f"{uuid.uuid4()}.{extension}"  # Генерируем уникальное имя
        file_path = os.path.join(settings.photos_dir, file_name)

        # Декодируем и сохраняем файл
        with open(file_path, "wb") as f:
            f.write(base64.b64decode(encoded))

        return f"/media/{file_name}"  # Добавляем путь в список
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Ошибка при обработке фото {i}: {str(e)}")
