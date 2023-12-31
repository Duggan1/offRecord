"""Your migration message

Revision ID: 2ad30eea86e3
Revises: 7043c9aa7834
Create Date: 2023-12-05 13:23:32.017353

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2ad30eea86e3'
down_revision = '7043c9aa7834'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ufc_fights', schema=None) as batch_op:
        batch_op.add_column(sa.Column('odds', sa.String(length=50), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ufc_fights', schema=None) as batch_op:
        batch_op.drop_column('odds')

    # ### end Alembic commands ###
