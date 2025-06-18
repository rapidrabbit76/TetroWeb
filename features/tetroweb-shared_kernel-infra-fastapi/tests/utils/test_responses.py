from tetroweb.shared_kernel.infra.fastapi.utils.responses import MsgSpecJSONResponse, XmlResponse

def test_msgspec_json_response():
    resp = MsgSpecJSONResponse(content={"foo": "bar"})
    assert resp.status_code == 200
    assert resp.body is not None

def test_xml_response():
    resp = XmlResponse(content="<foo>bar</foo>")
    assert resp.status_code == 200
    assert resp.body == b"<foo>bar</foo>"
