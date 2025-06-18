from tetroweb.shared_kernel.infra.fastapi.utils.router import LoggingRestAPIRoute

def test_logging_rest_api_route():
    route = LoggingRestAPIRoute(endpoint=lambda: None, path="/", methods=["GET"])
    assert route.path == "/"
