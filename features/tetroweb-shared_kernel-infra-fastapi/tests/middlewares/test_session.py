from tetroweb.shared_kernel.infra.fastapi.middlewares.session import AppSessionManager

def test_app_session_manager_init():
    manager = AppSessionManager()
    assert manager is not None
