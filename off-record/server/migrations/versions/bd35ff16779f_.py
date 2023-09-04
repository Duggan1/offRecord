"""empty message

Revision ID: bd35ff16779f
Revises: 
Create Date: 2023-09-03 13:48:20.539941

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'bd35ff16779f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=True),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.Column('fullname', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username')
    )
    op.create_table('picks',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('owner', sa.String(length=120), nullable=False),
    sa.Column('location', sa.String(length=120), nullable=False),
    sa.Column('main_event', sa.String(length=120), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('predictions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('picks_id', sa.Integer(), nullable=False),
    sa.Column('fighters', sa.JSON(), nullable=False),
    sa.Column('winner', sa.Integer(), nullable=False),
    sa.Column('method', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['picks_id'], ['picks.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('predictions')
    op.drop_table('picks')
    op.drop_table('users')
    # ### end Alembic commands ###