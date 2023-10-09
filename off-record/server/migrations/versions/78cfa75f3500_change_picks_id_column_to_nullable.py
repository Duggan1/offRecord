"""Change picks_id column to nullable

Revision ID: 78cfa75f3500
Revises: bd35ff16779f
Create Date: 2023-10-09 18:37:35.832574

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '78cfa75f3500'
down_revision = 'bd35ff16779f'
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
