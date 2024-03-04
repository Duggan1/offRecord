from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api, Resource
from sqlalchemy import MetaData, Table, Column, Integer, ForeignKey
from sqlalchemy.orm import validates, relationship
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from datetime import datetime
from flask import json



from config import db, bcrypt

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
#     league_id = db.Column(db.Integer, db.ForeignKey('leagues.id'))
#     leagues_participating = db.relationship('League', secondary='user_league_association', backref='participants')
#     leagues_created = db.relationship('League', backref='creator', lazy='dynamic')

#     user_league_association = db.Table(
#     'user_league_association',
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
#     db.Column('league_id', db.Integer, db.ForeignKey('leagues.id'))
# )


    

  
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
league_members = db.Table(
    'league_members',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('league_id', db.Integer, db.ForeignKey('leagues.id')),
)
# ////////////////////////////////////////////////

class League(db.Model):
    __tablename__ = 'leagues'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False, unique=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False, unique=True)
    message = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(255), nullable=False)
    # members = db.Column(db.String(255), nullable=False)
    passcode = db.Column(db.Integer, nullable=True)

    members = db.relationship('User', secondary='league_members', backref='leagues')

    def __init__(self, name, owner_id, message, image,members, passcode=None):
        self.name = name
        self.owner_id = owner_id
        self.message = message
        self.image = image
        self.members = members
        self.passcode = passcode












class Pick(db.Model):
    __tablename__ = 'picks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),nullable=False)
    owner = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    main_event = db.Column(db.String(120), nullable=False)
    event_league = db.Column(db.String(120), nullable=True)
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
    # event_league = db.Column(db.String(120), nullable=True)
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


class PFLEvent(db.Model):
    __tablename__ = 'pfl_events'

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(255), nullable=False)
    locationCC = db.Column(db.String(255), nullable=True)
    backgroundImageSrc = db.Column(db.String(255), nullable=True)
    tapImage = db.Column(db.String(500), nullable=True)
    # event_league = db.Column(db.String(120), nullable=True)
    fights = db.relationship('PFLFight', backref='pfl_event', lazy='dynamic')

class PFLFight(db.Model):
    __tablename__ = 'pfl_fights'

    id = db.Column(db.Integer, primary_key=True)
    weight_class = db.Column(db.String(255), nullable=True)
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

    event_id = db.Column(db.Integer, db.ForeignKey('pfl_events.id'), nullable=False)


class ACAEvent(db.Model):
    __tablename__ = 'aca_events'

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(255), nullable=False)
    locationCC = db.Column(db.String(255), nullable=True)
    backgroundImageSrc = db.Column(db.String(255), nullable=True)
    tapImage = db.Column(db.String(1000), nullable=True)
    # event_league = db.Column(db.String(120), nullable=True)
    fights = db.relationship('ACAFight', backref='aca_event', lazy='dynamic')

class ACAFight(db.Model):
    __tablename__ = 'aca_fights'

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

    event_id = db.Column(db.Integer, db.ForeignKey('aca_events.id'), nullable=False)


class ONEEvent(db.Model):
    __tablename__ = 'one_events'

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(255), nullable=False)
    locationCC = db.Column(db.String(255), nullable=True)
    backgroundImageSrc = db.Column(db.String(255), nullable=True)
    tapImage = db.Column(db.String(1000), nullable=True)
    # event_league = db.Column(db.String(120), nullable=True)
    fights = db.relationship('ONEFight', backref='one_event', lazy='dynamic')

class ONEFight(db.Model):
    __tablename__ = 'one_fights'

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

    event_id = db.Column(db.Integer, db.ForeignKey('one_events.id'), nullable=False)


class BellatorEvent(db.Model):
    __tablename__ = 'bellator_events'

    id = db.Column(db.Integer, primary_key=True)
    event_name = db.Column(db.String(255), nullable=False)
    locationCC = db.Column(db.String(255), nullable=True)
    backgroundImageSrc = db.Column(db.String(255), nullable=True)
    tapImage = db.Column(db.String(1000), nullable=True)
    # event_league = db.Column(db.String(120), nullable=True)
    fights = db.relationship('BellatorFight', backref='bellator_event', lazy='dynamic')

class BellatorFight(db.Model):
    __tablename__ = 'bellator_fights'

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

    event_id = db.Column(db.Integer, db.ForeignKey('bellator_events.id'), nullable=False)



