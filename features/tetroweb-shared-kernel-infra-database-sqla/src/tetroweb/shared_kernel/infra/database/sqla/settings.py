import typing as T
from datetime import datetime
from pydantic import BaseModel, Field


class DatabaseSettings(BaseModel):
    url: str = Field("", description="Database URL")
    init: bool = False
    echo: bool = True
    pool_size: int = 10
    max_overflow: int = 2
    pool_recycle: int = 1800  # 중복 제거 및 기본값 통일
    pg_schema: str = "public"
    pool_timeout: int = 30
    pool_pre_ping: bool = True

    def dict(self):
        return {
            "url": self.url,
            "echo": self.echo,
            "max_overflow": self.max_overflow,
            "pool_size": self.pool_size,
            "pool_recycle": self.pool_recycle,
            "pool_timeout": self.pool_timeout,
            "pool_pre_ping": self.pool_pre_ping,
            "pg_schema": self.pg_schema,
        }
