import asyncio
import uuid
from functools import partial
import aio_pika
from fastapi import HTTPException

from src.app.accounts.service import UserService
from src.config import settings, logger
from src.database import db
from src.dependencies import validate_token


async def check_token(message: aio_pika.abc.AbstractIncomingMessage, channel: aio_pika.RobustChannel):
    async with message.process():
        token = message.body.decode()
        try:
            await validate_token(token=token)
            response = b'\x01'
        except HTTPException as e:
            response = str(e.detail).encode()

        if message.reply_to:
            await channel.default_exchange.publish(
                aio_pika.Message(
                    body=response,
                    correlation_id=message.correlation_id
                ),
                routing_key=message.reply_to
            )


async def consume_rabbitmq():
    while True:
        try:
            connection = await aio_pika.connect_robust(
                f'amqp://{settings.RABBITMQ_USER}:{settings.RABBITMQ_PASSWORD}@{settings.RABBITMQ_HOST}/'
            )
            channel = await connection.channel()

            token_queue = await channel.declare_queue(
                'check_token', auto_delete=True
            )
            await token_queue.consume(partial(check_token, channel=channel))

            logger.info('Успешное подключение к RabbitMQ')
            break
        except Exception as e:
            logger.error(f'Ошибка подключения к RabbitMQ: {e}. Переподключение через 5 секунд...')
            await asyncio.sleep(5)
