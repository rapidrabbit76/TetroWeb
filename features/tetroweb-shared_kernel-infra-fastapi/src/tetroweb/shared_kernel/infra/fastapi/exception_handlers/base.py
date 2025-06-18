from fastapi import Request
from fastapi.responses import JSONResponse
from tetroweb.shared_kernel.domain.exception import BaseMsgException

from tetroweb.shared_kernel.infra.fastapi.dtos.response import ResponseDto


async def custom_exception_handler(request: Request, exe: BaseMsgException):
    return JSONResponse(
        status_code=exe.code if hasattr(exe, "code") else 500,
        content=ResponseDto(
            status=exe.code if hasattr(exe, "code") else 500,
            message=exe.message if hasattr(exe, "message") else "Internal Server Error",
            data={
                "method": request.method,
                "path": request.url.path,
                "request_id": request.state.correlation_id if hasattr(request.state, "correlation_id") else None,
                "detail": exe.message if hasattr(exe, "message") else "An error occurred",
                "error": exe.error if hasattr(exe, "error") else "Unknown Error",
                "status_code": exe.code if hasattr(exe, "code") else 500,
            },
        ).model_dump(),
    )
