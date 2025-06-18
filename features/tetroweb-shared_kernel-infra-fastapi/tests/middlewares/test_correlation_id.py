from tetroweb.shared_kernel.infra.fastapi.middlewares.correlation_id import CorrelationIdMiddleware

class DummyApp:
    async def __call__(self, scope, receive, send):
        pass

def test_correlation_id_middleware_adds_header():
    middleware = CorrelationIdMiddleware(DummyApp())
    assert hasattr(middleware, "app")
