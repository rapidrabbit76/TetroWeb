from tetroweb.shared_kernel.infra.fastapi.dtos.response.base import ResponseDto

def test_response_dto():
    resp = ResponseDto(status=200, data={"foo": "bar"}, message="ok")
    assert resp.status == 200
    assert resp.data == {"foo": "bar"}
    assert resp.message == "ok"
