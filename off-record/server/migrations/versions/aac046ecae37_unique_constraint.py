"""unique constraint

Revision ID: aac046ecae37
Revises: b62f6f1641ca
Create Date: 2024-03-04 14:59:23.421460

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'aac046ecae37'
down_revision = 'b62f6f1641ca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('aca_events', schema=None) as batch_op:
        batch_op.create_unique_constraint('unique_event_location', ['event_name', 'locationCC'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('aca_events', schema=None) as batch_op:
        batch_op.drop_constraint('unique_event_location', type_='unique')

    # ### end Alembic commands ###