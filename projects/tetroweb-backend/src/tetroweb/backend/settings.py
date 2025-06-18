from pydantic_settings import BaseSettings, SettingsConfigDict

from tetroweb.shared_kernel.domain.enum import ApplicationMode
from tetroweb.shared_kernel.infra.settings.model import (
    SessionSettings,
    CacheSettings,
    CORSSettings,
    FastAPISettings,
    GZipSettings,
)
from tetroweb.shared_kernel.infra.database.sqla.settings import DatabaseSettings


class Settings(BaseSettings):
    mode: ApplicationMode = ApplicationMode.devel
    db: DatabaseSettings = DatabaseSettings()
    cors: CORSSettings = CORSSettings()
    gzip: GZipSettings = GZipSettings()
    cache: CacheSettings = CacheSettings()
    fastapi: FastAPISettings = FastAPISettings(
        title="tetroweb API",
        description="tetroweb API",
        docs_url="/docs/openapi",
        openapi_url="/docs/openapi.json",
        redoc_url="/redoc",
    )
    session: SessionSettings = SessionSettings()

    model_config = SettingsConfigDict(
        env_prefix="TETROWEB_", env_nested_delimiter="__", env_file_encoding="utf-8", extra="allow"
    )


Settings.model_rebuild()
