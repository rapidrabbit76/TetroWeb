import pytest
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, clear_mappers, Mapped, mapped_column
from tetroweb.shared_kernel.infra.database.sqla.base import Base
from tetroweb.shared_kernel.infra.database.sqla.repository import RDBRepository
import sqlalchemy as sa


@pytest.fixture(scope="function")
def in_memory_db():
    engine = create_engine("sqlite:///:memory:", echo=False)
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine)
    session = Session()
    yield session
    session.close()
    clear_mappers()


class ExampleEntity(Base):
    __tablename__ = "example_entity"
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)
    name: Mapped[str] = mapped_column(sa.String)


# 공통 CRUD 테스트 함수로 중복 제거
def test_add_and_commit(in_memory_db: sessionmaker):
    name = "test_entity"
    entity = ExampleEntity(name=name)
    RDBRepository.add(in_memory_db, entity)
    in_memory_db.commit()
    result = in_memory_db.query(ExampleEntity).filter_by(name=name).first()
    assert result is not None
    assert result.name == name


# 예외 처리 테스트 예시
def test_commit_exception(in_memory_db: sessionmaker):
    with pytest.raises(Exception):
        in_memory_db.execute("INVALID SQL")
        in_memory_db.commit()
