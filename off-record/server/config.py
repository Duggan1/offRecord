from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from sqlalchemy import MetaData, create_engine
from secret import secret_key
import os


# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# Example database URI for PostgreSQL (replace with your actual database connection details)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://duggan:8MwybYJJRY8cy6j2ZofIoOe6ngTgCop0@dpg-cjpuoqe1208c73evnus0-a/offrecord'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://duggan:8MwybYJJRY8cy6j2ZofIoOe6ngTgCop0@dpg-cjpuoqe1208c73evnus0-a.oregon-postgres.render.com/offrecord'
# export DATABASE_URI=

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = secret_key


db = SQLAlchemy(app)

migrate = Migrate(app, db)

bcrypt = Bcrypt(app)
# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app, resources={r"/api/*": {"origins": "https://offtherecordpicks.onrender.com"}})

