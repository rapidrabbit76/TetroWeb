from tetroweb.shared_kernel.infra.fastapi.dtos.response.pageable import PaginationResponse, PageMeta

def test_pagination_response():
    meta = PageMeta(page=1, size=10, total=3)
    resp = PaginationResponse(items=[1,2,3], meta=meta)
    assert resp.items == [1,2,3]
    assert resp.meta.page == 1
    assert resp.meta.size == 10
    assert resp.meta.total == 3
