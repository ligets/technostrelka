# ПРИ ЗАПУСКЕ НАДО СДЕЛАТЬ СИДДЭР НА СОЗДАНИЕ 2 ПОЛЬЗОВАТЕЛЕЙ И 1 АДМИНА ИЛИ СДЕЛАТЬ dump.sql !!!

# Копирование репозитория и запуск проекта

#### Описание консольных команд
1. Установка git
2. Создание директории для проекта
3. Копирование репозитория с GitHub в созданную директорию
4. Переход к директории
5. Делаем файл ./run.sh исполняемым, который делает скрипты ./sh/install-docker.sh, ./sh/build-docker.sh исполнаемыми и запускает их в порядке очереди которая описана в ./sh/order.txt
6. Запускаем ./run.sh

#### Команды

```shell
sudo apt install git
sudo mkdir /technostrelka
sudo git clone http://github.com/ligets/technostrelka /technostrelka
cd /technostrelka
sudo chmod +x ./run.sh
sudo ./run.sh
```
#### Примечание к запуску!
После выполнения консольных команд требуется дождаться окончание установки docker на сервер и окончание билда проекта, после этого нужно подождать пока запустится фронтенд (около минуты), при первом открытие страниц после билда он будет их прогружать (будет занимать немного времени, связано со спецификацией билда next js), после прогрузки всех страниц, они открываются очень быстро

# Основные технологии
### Frontend
* Next JS (app router)
### Backend
* PostgreSQL - СУБД
* RabbitMQ - менеджер собщений для связи между микросервисами
* Python - язык программирования на котором написан backend
* FastAPI - асинхронный фреймворк для написания backend'а
* Uvicorn - сервер на котором запускается backend
* Pydantic - Библиотека для валидации
* AsyncPG - коннектор с бд
* SQLAlchemy - orm система
* Alembic - миграции (на production отключено, использовался dump.sql чтобы были какие то данные)
* Aio-pika - библиотека для управления RabbitMQ
* PyJWT - библиотека для работа с JWT токенами
* Swagger - документация для бэкенда

# Ссылки на приложения
* __frontend__ - http://localhost:3000/
* __backend__:
    1. http://localhost:8081/ui-swagger
    2. http://localhost:8082/ui-swagger
* __web-pgAdmin__ - http://localhost:5050/ (данные для входа admin@admin.com, пароль admin, а так же после авторизации необходимо добавить сам сервер бд, хост сервера: postgres:5432)
* __web-панель rabbitMQ__ - http://localhost:15672/ (данные для входа: логин guest, пароль guest)
* __figma__ - [КЛИКАБЕЛЬНО!!!](https://www.figma.com/design/9fhhrJkNBst6rEiaaPSbkm/Technostrelka?node-id=1-2&t=FKHjwP4Ir8WqFCho-1)

---

## Команды для запуска проекты с разными сборками
#### Примечание! Перед использованием этих команд остановите прошлый контейнер командой ```docker compose down```





Запуск docker-compose.yaml для production для минимальной сборки
```shell
    docker compose up --build -d
```

---

Запуск docker-compose.dev.yaml с web pgAdmin и web-панелью rabbitMQ 
```shell
    docker compose -f docker-compose.dev.yaml up --build -d
```
