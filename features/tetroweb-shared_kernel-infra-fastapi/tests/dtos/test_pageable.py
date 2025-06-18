import pytest
from tetroweb.shared_kernel.infra.fastapi.dtos.request.pageable import Pageable

def test_pageable_default():
    p = Pageable()
    assert p.page == 1
    assert p.size == 20

def test_pageable_custom():
    p = Pageable(page=3, size=50)
    assert p.page == 3
    assert p.size == 50
