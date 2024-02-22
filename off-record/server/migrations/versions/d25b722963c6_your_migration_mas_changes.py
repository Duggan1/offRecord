"""Your migration mas changes

Revision ID: d25b722963c6
Revises: be121a5e5422
Create Date: 2024-02-22 15:08:51.572917

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd25b722963c6'
down_revision = 'be121a5e5422'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pfl_events',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('event_name', sa.String(length=255), nullable=False),
    sa.Column('locationCC', sa.String(length=255), nullable=True),
    sa.Column('backgroundImageSrc', sa.String(length=255), nullable=True),
    sa.Column('tapImage', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('pfl_fights',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('weight_class', sa.String(length=255), nullable=True),
    sa.Column('red_corner_name', sa.String(length=255), nullable=False),
    sa.Column('blue_corner_name', sa.String(length=255), nullable=False),
    sa.Column('red_corner_country', sa.String(length=255), nullable=False),
    sa.Column('blue_corner_country', sa.String(length=255), nullable=False),
    sa.Column('red_corner_record', sa.String(length=255), nullable=False),
    sa.Column('blue_corner_record', sa.String(length=255), nullable=False),
    sa.Column('red_corner_image', sa.String(length=255), nullable=False),
    sa.Column('blue_corner_image', sa.String(length=255), nullable=False),
    sa.Column('method', sa.String(length=50), nullable=True),
    sa.Column('round', sa.String(length=50), nullable=True),
    sa.Column('winner', sa.String(length=50), nullable=True),
    sa.Column('odds', sa.String(length=50), nullable=True),
    sa.Column('event_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['event_id'], ['pfl_events.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pfl_fights')
    op.drop_table('pfl_events')
    # ### end Alembic commands ###
