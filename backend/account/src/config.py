from contextlib import asynccontextmanager

from aiobotocore.client import AioBaseClient
from aiobotocore.session import get_session
from dotenv import load_dotenv
from pathlib import Path

import logging
from pydantic_settings import BaseSettings, SettingsConfigDict

load_dotenv()

BaseDir = Path(__file__).parent.parent


class JWTSettings(BaseSettings):
    private_key_path: Path = BaseDir / "certificates" / "private_key.pem"
    public_key_path: Path = BaseDir / "certificates" / "public_key.pem"
    algorithm: str = "RS256"
    access_token_expire_minutes: int
    refresh_token_expire_days: int

    model_config = SettingsConfigDict(env_file='.env', extra='ignore', env_prefix='JWT_')


class Settings(BaseSettings):
    POSTGRES_HOST: str
    POSTGRES_PORT: str
    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_DB: str

    POSTGRES_TEST_HOST: str
    POSTGRES_TEST_PORT: str
    POSTGRES_TEST_USER: str
    POSTGRES_TEST_PASSWORD: str
    POSTGRES_TEST_DB: str

    RABBITMQ_HOST: str
    RABBITMQ_USER: str
    RABBITMQ_PASSWORD: str

    REDIS_HOST: str

    @property
    def POSTGRES_URL(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    @property
    def POSTGRES_TEST_URL(self) -> str:
        return f"postgresql+asyncpg://{self.POSTGRES_TEST_USER}:{self.POSTGRES_TEST_PASSWORD}@{self.POSTGRES_TEST_HOST}:{self.POSTGRES_TEST_PORT}/{self.POSTGRES_TEST_DB}"

    db_echo: bool = False
    auth_jwt: JWTSettings = JWTSettings()

    model_config = SettingsConfigDict(env_file='.env', extra='ignore')


class S3Client:
    def __init__(
            self,
            access_key: str,
            secret_key: str,
            endpoint_url: str,
            bucket_name: str,
    ):
        self.config = {
            "aws_access_key_id": access_key,
            "aws_secret_access_key": secret_key,
            "endpoint_url": endpoint_url
        }
        self.bucket_name = bucket_name
        self.session = get_session()

    @asynccontextmanager
    async def get_client(self) -> AioBaseClient:
        async with self.session.create_client("s3", **self.config) as client:
            yield client

    async def upload_file(
            self,
            file: bytes,
            object_name: str,
    ):
        async with self.get_client() as client:
            await client.put_object(
                Bucket=self.bucket_name,
                Key=object_name,
                Body=file
            )


settings = Settings()

logger = logging.getLogger("uvicorn.error")
