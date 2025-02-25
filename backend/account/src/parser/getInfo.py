import os
import sys

import httpx
from bs4 import BeautifulSoup

sys.path.append(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))

from src.app.accounts.dao import UserDAO
from src.app.authentication.utils import get_password_hash
from src.app.district.dao import DistrictDAO
from src.database import db


async def get_ruks():
    url = "https://fsp-russia.com/region/regions/"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    html = response.text
    soup = BeautifulSoup(html, "html.parser")

    # Находим все секции с федеральными округами
    federal_districts = soup.find_all("div", "accordion-item")

    # Проходим по каждому федеральному округу
    for district in federal_districts:
        district_name = district.find("h4").text.strip()  # Название федерального округа

        # Находим все регионы внутри федерального округа
        regions = district.find_all("div", "contact_td")
        async with db.session() as session:
            district = await DistrictDAO.add(session, {"name": district_name})

            for region in regions:

                region_name = region.find("p", "white_region")

                if not region_name:
                    continue
                region_name = region_name.text.strip()

                # Извлекаем руководителя, если есть
                fio = region.find("div", class_="cont ruk")
                fio = fio.find("p", class_="white_region").text.strip().split(" ") if fio else None

                # Извлекаем контактные данные
                email = region.find("div", class_="cont con")
                email = email.find("p", class_="white_region").text.strip() if email else "Не указан"

                data = {
                    'email': email,
                    "district_id": district.id,
                    "role": "Admin",
                    "hashed_password": get_password_hash(email),
                    "region": region_name
                }
                if fio and len(fio[0]) > 0:
                    data['first_name'] = fio[1]
                    data['last_name'] = fio[0]
                    data['patronymic'] = fio[2] if len(fio) > 2 else None
                else:
                    data['first_name'] = "Не укзано"

                # Добавляем данные в список
                await UserDAO.add(session, data)


# Пример вызова функции в асинхронной среде
import asyncio

asyncio.run(get_ruks())
