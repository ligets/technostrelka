"""add saved

Revision ID: d18fad59a28a
Revises: 0da8676632ea
Create Date: 2025-02-26 12:35:17.968819

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = 'd18fad59a28a'
down_revision: Union[str, None] = '0da8676632ea'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('saved_routes',
                    sa.Column('id', sa.UUID(), nullable=False),
                    sa.Column('user_id', sa.UUID(), nullable=False),
                    sa.Column('route_id', sa.UUID(), nullable=False),
                    sa.ForeignKeyConstraint(['route_id'], ['routes.id'], ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('saved_routes')
    # ### end Alembic commands ###
