from fastapi import FastAPI
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.staticfiles import StaticFiles

from tetroweb.backend.container import TetrowebContainer
from tetroweb.backend.endpoint.rest.fastapi import endpoint as APIEndpoints
from tetroweb.backend.lifespan import lifespan
from tetroweb.backend.settings import Settings
from tetroweb.shared_kernel.domain.exception import BaseMsgException
from tetroweb.shared_kernel.infra.fastapi.exception_handlers.base import custom_exception_handler
from tetroweb.shared_kernel.infra.fastapi.middlewares.correlation_id import CorrelationIdMiddleware
from tetroweb.shared_kernel.infra.fastapi.middlewares.session import SessionMiddleware
from tetroweb.shared_kernel.infra.fastapi.utils.responses import MsgSpecJSONResponse

container = TetrowebContainer()
settings: Settings = container.settings.provided()


def create_app() -> FastAPI:
    middleware = [
        Middleware(CorrelationIdMiddleware),
        Middleware(
            CORSMiddleware,
            allow_origins=settings.cors.allow_origins,
            allow_credentials=settings.cors.allow_credentials,
            allow_methods=settings.cors.allow_methods,
            allow_headers=settings.cors.allow_headers,
        ),
        Middleware(SessionMiddleware, secret_key=settings.session.secret_key),
        Middleware(GZipMiddleware),
    ]

    app = FastAPI(
        title=settings.fastapi.title,
        description=settings.fastapi.description,
        contact=settings.fastapi.contact,
        summary=settings.fastapi.summary,
        middleware=middleware,
        lifespan=lifespan,
        docs_url=settings.fastapi.docs_url,
        redoc_url=settings.fastapi.redoc_url,
        openapi_url=settings.fastapi.openapi_url,
        default_response_class=MsgSpecJSONResponse,
        exception_handlers={
            BaseMsgException: custom_exception_handler,
        },
    )

    app.container = container  # type: ignore
    app.settings = settings  # type: ignore

    app.include_router(APIEndpoints)

    app.mount(
        "",
        StaticFiles(
            directory="web",
            html=True,
            follow_symlink=True,
        ),
        name="web",
    )
    return app


app = create_app()
