"""add comments

Revision ID: 78f3761affaa
Revises: 443f67945e07
Create Date: 2025-02-26 09:39:23.915867

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '78f3761affaa'
down_revision: Union[str, None] = '443f67945e07'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('comments',
                    sa.Column('id', sa.UUID(), nullable=False),
                    sa.Column('post_id', sa.UUID(), nullable=False),
                    sa.Column('author_id', sa.UUID(), nullable=False),
                    sa.Column('text', sa.String(), nullable=False),
                    sa.Column('rating', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['post_id'], ['routes.id'], ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('answers',
                    sa.Column('id', sa.UUID(), nullable=False),
                    sa.Column('comment_id', sa.UUID(), nullable=False),
                    sa.Column('author_id', sa.UUID(), nullable=False),
                    sa.Column('text', sa.String(), nullable=False),
                    sa.ForeignKeyConstraint(['comment_id'], ['comments.id'], ondelete='CASCADE'),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('answers')
    op.drop_table('comments')
    # ### end Alembic commands ###
