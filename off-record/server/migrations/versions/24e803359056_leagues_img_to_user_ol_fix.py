"""Leagues & + img to user OL fix

Revision ID: 24e803359056
Revises: 9cc3e3134f4a
Create Date: 2024-01-18 09:32:53.385958

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '24e803359056'
down_revision = '9cc3e3134f4a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('picks', schema=None) as batch_op:
        batch_op.drop_column('pools')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('picks', schema=None) as batch_op:
        batch_op.add_column(sa.Column('pools', sa.VARCHAR(length=120), autoincrement=False, nullable=True))

    # ### end Alembic commands ###
