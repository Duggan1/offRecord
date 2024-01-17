"""Leagues & + img to users2

Revision ID: 9cc3e3134f4a
Revises: 2d619cd95207
Create Date: 2024-01-17 11:42:18.703799

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9cc3e3134f4a'
down_revision = '2d619cd95207'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_league_association')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_league_association',
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('league_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['league_id'], ['leagues.id'], name='user_league_association_league_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='user_league_association_user_id_fkey')
    )
    # ### end Alembic commands ###
