from fastapi_mail import ConnectionConfig, FastMail
from pydantic_settings import BaseSettings, SettingsConfigDict


class MailConfig(BaseSettings):
    mail: str
    password: str
    port: int
    server: str
    tls: bool = True
    ssl: bool = False

    @property
    def connection(self):
        return ConnectionConfig(
            MAIL_USERNAME=self.mail,
            MAIL_PASSWORD=self.password,
            MAIL_FROM=self.mail,
            MAIL_PORT=self.port,
            MAIL_SERVER=self.server,
            MAIL_STARTTLS=self.tls,
            MAIL_SSL_TLS=self.ssl,
            TEMPLATE_FOLDER="src/templates/"
        )

    model_config = SettingsConfigDict(env_file='.env', extra='ignore', env_prefix='SMTP_')


class Settings(BaseSettings):
    postgres_host: str
    postgres_port: int
    postgres_user: str
    postgres_password: str
    postgres_db: str

    @property
    def postgres_url(self) -> str:
        return f"postgresql+asyncpg://{self.postgres_user}:{self.postgres_password}@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"

    rabbitmq_host: str
    rabbitmq_user: str
    rabbitmq_password: str

    @property
    def rabbitmq_url(self):
        return f"amqp://{self.rabbitmq_user}:{self.rabbitmq_password}@{self.rabbitmq_host}/"

    db_echo: bool = False

    smtp: MailConfig = MailConfig()

    model_config = SettingsConfigDict(env_file='.env', extra='ignore')


settings = Settings()
fm = FastMail(settings.smtp.connection)