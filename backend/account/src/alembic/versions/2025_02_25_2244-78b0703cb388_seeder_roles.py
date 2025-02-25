"""seeder_roles

Revision ID: 78b0703cb388
Revises: 3dd83612108f
Create Date: 2025-02-25 22:44:18.707173

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.orm import Session

# revision identifiers, used by Alembic.
revision: str = '78b0703cb388'
down_revision: Union[str, None] = '1d0bf6924924'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    bind = op.get_bind()
    session = Session(bind=bind)

    session.execute(sa.text("""
            INSERT INTO roles (name) VALUES
                ('Admin'),
                ('User')
        """))

    session.commit()


def downgrade() -> None:
    bind = op.get_bind()
    session = Session(bind=bind)

    session.execute(sa.text("""
            DELETE FROM roles WHERE name IN ('Admin', 'User')
        """))

    session.commit()
