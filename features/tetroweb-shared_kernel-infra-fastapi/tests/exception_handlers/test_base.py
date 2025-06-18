from tetroweb.shared_kernel.infra.fastapi.exception_handlers.base import custom_exception_handler
import pytest
import json


class DummyRequest:
    def __init__(self):
        self.method = "GET"
        self.url = type("obj", (object,), {"path": "/test"})()
        self.state = type("obj", (object,), {"correlation_id": "abc"})()


class DummyException(Exception):
    code = 400
    message = "error"
    error = "dummy"


@pytest.mark.asyncio
async def test_custom_exception_handler():
    req = DummyRequest()
    exc = DummyException()
    response = await custom_exception_handler(req, exc)
    assert response.status_code == 400
    assert response.body is not None
    
    body = response.body.decode("utf-8")
    data = json.loads(body)
    assert data["data"]["error"] == "dummy"
