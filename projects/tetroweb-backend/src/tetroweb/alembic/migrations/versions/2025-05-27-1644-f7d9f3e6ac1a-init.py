"""init

Revision ID: f7d9f3e6ac1a
Revises:
Create Date: 2025-05-27 16:44:14.958849+00:00

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from tetroweb.alembic.migrations.utils import get_existing_tables
from sqlalchemy_fields.types import UUIDType, URLType
from tetroweb.backend.leaderboard import entities as leaderbard_entities

# revision identifiers, used by Alembic.
revision: str = "f7d9f3e6ac1a"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    existing_tables = set(get_existing_tables())  # noqa: F841

    if leaderbard_entities.LeaderBoardLog.__tablename__ not in existing_tables:
        op.create_table(
            leaderbard_entities.LeaderBoardLog.__tablename__,
            sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
            sa.Column("user_id", sa.String(48), nullable=False),
            sa.Column("game", sa.String(10), nullable=False),
            sa.Column("score", sa.Integer, nullable=False, default=0),
            sa.Column("name", sa.Text, nullable=False),
            sa.Column("email", sa.Text, nullable=True, default=None),
            sa.Column("created_at", sa.TIMESTAMP(timezone=True), default=sa.func.now(), nullable=False),
            sa.Column("updated_at", sa.TIMESTAMP(timezone=True), default=sa.func.now(), nullable=False),
            sa.Index(
                f"idx_{leaderbard_entities.LeaderBoardLog.__tablename__}_user_id_game_date",
                "user_id",
                "game",
                "created_at",
                unique=True,
            ),
        )


def downgrade() -> None:
    existing_tables = set(get_existing_tables())  # noqa: F841

    if leaderbard_entities.LeaderBoardLog.__tablename__ in existing_tables:
        op.drop_table(leaderbard_entities.LeaderBoardLog.__tablename__)
