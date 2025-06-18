import py
import pytest
import pytest_asyncio
import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker, clear_mappers
from tetroweb.shared_kernel.infra.database.sqla.base import Base
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column


@pytest_asyncio.fixture(scope="function")
async def async_in_memory_db():
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", echo=False)
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    AsyncSessionLocal = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
    async with AsyncSessionLocal() as session:
        yield session
    await engine.dispose()
    clear_mappers()


class ExampleEntity(Base):
    __tablename__ = "example_entity"
    __table_args__ = {"extend_existing": True}
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)
    name: Mapped[str] = mapped_column(sa.String)


@pytest_asyncio.fixture(scope="function")
async def test_async_add_and_commit(async_in_memory_db):
    name = "test_entity_async"
    entity = ExampleEntity(name=name)
    async_in_memory_db.add(entity)
    await async_in_memory_db.commit()
    result = await async_in_memory_db.get(ExampleEntity, entity.id)
    assert result is not None
    assert result.name == name


@pytest.mark.asyncio
async def test_async_commit_exception(async_in_memory_db):
    with pytest.raises(Exception):
        await async_in_memory_db.execute("INVALID SQL")
        await async_in_memory_db.commit()
