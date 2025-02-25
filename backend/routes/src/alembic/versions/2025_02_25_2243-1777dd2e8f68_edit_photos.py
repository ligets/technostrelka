"""edit photos

Revision ID: 1777dd2e8f68
Revises: cea5436af167
Create Date: 2025-02-25 22:43:17.252980

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '1777dd2e8f68'
down_revision: Union[str, None] = 'cea5436af167'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('points',
                    sa.Column('id', sa.UUID(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('description', sa.String(), nullable=True),
                    sa.Column('coord_x', sa.Float(), nullable=False),
                    sa.Column('coord_y', sa.Float(), nullable=False),
                    sa.Column('route_id', sa.UUID(), nullable=False),
                    sa.Column('photo_path', sa.String(), nullable=False),
                    sa.ForeignKeyConstraint(['route_id'], ['routes.id'], ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('route_photos',
                    sa.Column('id', sa.UUID(), nullable=False),
                    sa.Column('path', sa.String(), nullable=False),
                    sa.Column('route_id', sa.UUID(), nullable=False),
                    sa.ForeignKeyConstraint(['route_id'], ['points.id'], ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('route_photos')
    op.drop_table('points')
    # ### end Alembic commands ###
