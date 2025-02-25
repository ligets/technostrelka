import asyncio
import json
import os
import sys

from aio_pika import connect, IncomingMessage

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.config import settings
from src.app.notification.service import NotificationService


async def consume_rabbitmq():
    # Подключение к RabbitMQ
    connection = await connect(settings.rabbitmq_url)
    async with connection:
        # Открытие канала
        channel = await connection.channel()

        # Объявление очереди
        queue = await channel.declare_queue("send_notification", durable=True)

        # Обработчик сообщений
        async def on_message(message: IncomingMessage):
            async with message.process():
                body = json.loads(message.body.decode())
                email = body["email"]
                uuid = body["uuid"]
                type = body["type"]

                if type == "forgot":
                    await NotificationService.send_forgot(email, uuid)
                elif type == "confirm":
                    await NotificationService.send_confirm(email, uuid)



        # Подписка на очередь
        await queue.consume(on_message)

        print(" [*] Ожидание сообщений. Нажмите Ctrl+C для выхода.")
        await asyncio.Future()  # Блокировка до завершения

