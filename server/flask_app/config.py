from pydantic import BaseSettings
from starlette.config import Config


class Settings(BaseSettings):

    config = Config('../.envs/.env')
    config_db = Config('../.envs/.env.db')

    DEBUG = config('DEBUG', cast=bool, default=False)
    PROJECT_NAME = 'EVRAZ'
    DOMAIN = config('DOMAIN', cast=str, default='localhost')

    KAFKA_HOST = config('KAFKA_HOST', cast=str, default='')
    KAFKA_TOPIK = config('KAFKA_TOPIK', cast=str, default='')
    KAFKA_USER = config('KAFKA_USER', cast=str, default='')
    KAFKA_PASSWORD = config('KAFKA_PASSWORD', cast=str, default='')

    POSTGRES_SERVER = config_db('POSTGRES_SERVER', cast=str, default='db')
    POSTGRES_USER = config_db('POSTGRES_USER', cast=str, default='postgres')
    POSTGRES_PASSWORD = config_db('POSTGRES_PASSWORD', cast=str, default='postgres')
    POSTGRES_DB = config_db('POSTGRES_DB', cast=str, default='exhauster')
    POSTGRES_PORT = config_db('POSTGRES_PORT', cast=str, default='5432')
    DATABASE_URL = f'postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_SERVER}/{POSTGRES_DB}'


app_settings = Settings()
