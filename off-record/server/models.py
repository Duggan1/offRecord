from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime

from config import db, bcrypt
# metadata = MetaData(naming_convention={
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
#     "uq": "uq_%(table_name)s_%(column_0_name)s",
#     "ck": "ck_%(table_name)s_%(constraint_name)s",
#     "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
# })

# db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    serialize_rules= ("-created_at", "-updated_at","-_password_hash")

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String,nullable=False)
    fullname = db.Column(db.String, nullable=False)
    email = db.Column(db.String,nullable=False)
    image = db.Column(db.String,nullable=True)
   
    
    created_at = db.Column(db.DateTime, server_default = db.func.now())
    updated_at = db.Column(db.DateTime, onupdate = db.func.now())

    picks = db.relationship('Pick', backref = 'user', cascade = 'all, delete-orphan')
    # gyms = association_proxy('memberships', 'gym')
    league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'))
    leagues_participating = db.relationship('League', secondary='user_league_association', backref='participants')
    leagues_created = db.relationship('League', backref='creator', lazy='dynamic')

    # Association table for the many-to-many relationship between User and League
    user_league_association = db.Table('user_league_association',
        db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
        db.Column('league_id', db.Integer, db.ForeignKey('leagues.id'))
)
    

  
    @validates( 'email' )
    def Uemail(self, key, value):
        if len(value) < 1:
            raise ValueError( 'email too short')
        return value
    
   
    
    




    # def __repr__(self):
    #     return f'User {self.username}, ID {self.id}'

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python 3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    @staticmethod
    def simple_hash(input):
        return sum(bytearray(input, encoding='utf-8'))
    
    
# ////nullable fo gym&user idbefore the push
class League(db.Model):
    __tablename__ = 'leagues'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True )
    message = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    passcode = db.Column(db.Integer, nullable=True)
    

    # Define a one-to-many relationship with the User model
    members = db.relationship('User', backref='league', lazy='dynamic')
    creator = db.relationship('User', backref='created_leagues', lazy='dynamic')

    def __init__(self, name, owner_id):
        self.name = name
        self.owner_id = owner_id














class Pick(db.Model):
    __tablename__ = 'picks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    owner = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    main_event = db.Column(db.String(120), nullable=False)
    pools = db.Column(db.String(120), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    
    # Here we define a one-to-many relationship with the Prediction model
    predictions = db.relationship('Prediction', backref='pick', lazy='dynamic')

    # @validates('owner')
    # def validate_owner(self, key, value):
    #     # Add custom validation logic for the 'owner' field here
    #     if len(value) < 2:
    #         raise ValueError("Owner name must be at least 2 characters long.")
    #     return value

class Prediction(db.Model):
    __tablename__ = 'predictions'

    id = db.Column(db.Integer, primary_key=True)
    picks_id = db.Column(db.Integer, db.ForeignKey('picks.id'), nullable=False)
    fighters = db.Column(db.JSON, nullable=False)
    winner = db.Column(db.Integer, nullable=True)  # nullable True LIVE updates
    method = db.Column(db.String(50), nullable=True)
    round = db.Column(db.String(50), nullable=True)

    # You can add other fields as needed

    def as_dict(self):
        return {
            "fighters": self.fighters,
            "winner": self.winner,
            "method": self.method,
            "round": self.round
            # Add other fields here
        }
   

class UFCEvent(db.Model):
    __tablename__ = 'ufc_events'

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(255), nullable=False)
    locationCC = db.Column(db.String(255), nullable=False)
    backgroundImageSrc = db.Column(db.String(255), nullable=False)
    tapImage = db.Column(db.String(255), nullable=False)

    fights = db.relationship('UFCFight', backref='ufc_event', lazy='dynamic')

class UFCFight(db.Model):
    __tablename__ = 'ufc_fights'

    id = db.Column(db.Integer, primary_key=True)
    weight_class = db.Column(db.String(255), nullable=False)
    red_corner_name = db.Column(db.String(255), nullable=False)
    blue_corner_name = db.Column(db.String(255), nullable=False)
    red_corner_country = db.Column(db.String(255), nullable=False)
    blue_corner_country = db.Column(db.String(255), nullable=False)
    red_corner_record = db.Column(db.String(255), nullable=False)
    blue_corner_record = db.Column(db.String(255), nullable=False)
    red_corner_image = db.Column(db.String(255), nullable=False)
    blue_corner_image = db.Column(db.String(255), nullable=False)
    method = db.Column(db.String(50), nullable=True)
    round = db.Column(db.String(50), nullable=True)
    winner = db.Column(db.String(50), nullable=True)
    odds = db.Column(db.String(50), nullable=True)

    event_id = db.Column(db.Integer, db.ForeignKey('ufc_events.id'), nullable=False)















