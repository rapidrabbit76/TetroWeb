from fastapi import FastAPI
from fastapi.testclient import TestClient
from tetroweb.shared_kernel.infra.fastapi.dtos.response.pageable import PaginationResponse, PageMeta
from tetroweb.shared_kernel.infra.fastapi.middlewares.correlation_id import CorrelationIdMiddleware
from tetroweb.shared_kernel.infra.fastapi.utils.responses import MsgSpecJSONResponse, XmlResponse
from tetroweb.shared_kernel.infra.fastapi.exception_handlers.base import custom_exception_handler

app = FastAPI()
app.add_middleware(CorrelationIdMiddleware)
# app.add_middleware(AppSessionManager)
app.add_exception_handler(Exception, custom_exception_handler)


@app.get("/pageable", response_model=PaginationResponse)
def get_pageable(page: int = 1, size: int = 10):
    meta = PageMeta(page=page, size=size, total=2)
    return PaginationResponse(items=["a", "b"], meta=meta)


@app.get("/json", response_class=MsgSpecJSONResponse)
def get_json():
    return {"foo": "bar"}


@app.get("/xml", response_class=XmlResponse)
def get_xml():
    return {"foo": "bar"}


@app.get("/error")
def get_error():
    class DummyException(Exception):
        code = 500
        message = "fail"
        error = "dummy"

    raise Exception()


client = TestClient(app)


def test_pageable_integration():
    resp = client.get("/pageable?page=2&size=5")
    assert resp.status_code == 200
    data = resp.json()
    assert data["meta"]["page"] == 2
    assert data["meta"]["size"] == 5
    assert data["items"] == ["a", "b"]


def test_json_response():
    resp = client.get("/json")
    assert resp.status_code == 200
    assert resp.json() == {"foo": "bar"}


def test_xml_response():
    resp = client.get("/xml")
    assert resp.status_code == 200
    assert resp.headers["content-type"].startswith("text/xml")


def test_correlation_id_header():
    resp = client.get("/json")
    assert "x-correlation-id" in resp.headers
