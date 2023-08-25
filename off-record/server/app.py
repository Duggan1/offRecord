
from config import app, api,db, bcrypt
from flask import make_response, redirect, request, session, jsonify
from flask_restful import Resource, Api

from models import User, Session 
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Your database URI
# db = SQLAlchemy(app)







class Root(Resource):
    def get(self):
        return "Welcome to the Teacher Backend!"

api.add_resource(Root, '/')  
class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response(
            [user.to_dict() for user in users],
            200
        )

api.add_resource(Users, '/users')

class SignUp(Resource):
    def post(self):
        data = request.json
        username = data['userName']  # Change 'username' to 'userName'
        password = data['password']
        email = data['Email']
        fullname = data['fullName']  # Change 'fullname' to 'fullName'

        user_exists = User.query.filter_by(username=username).first() is not None

        if user_exists:
            return jsonify({"error": "User already exists"}), 409

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')  # Decode the hashed password

        try:
            new_user = User(
                _password_hash=hashed_password,
                username=username,
                email=email,
                fullname=fullname
            )
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id

            return jsonify({
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email,
                "fullName": new_user.fullname  # Change 'fullname' to 'fullName'
            })
        except ValueError:
            return make_response({"error": "Invalid input data"}, 400)






class Login(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter(
            User.username == data['username']
        ).first()

        password = data['_password']
        if not user:
            return {'error': 'Must enter a valid username and password'}, 404

        
        elif user.authenticate(password):
            session['user_id'] = user.id
            
            return make_response(
                user.to_dict(),
                200
            )
        return {'error': 'Must enter a valid username and password'}, 404



class CheckSession(Resource):

    def get(self):
        user = User.query.filter(User.id == session.get('user_id')).first()
        if user:
            return user.to_dict()
        else:
            return {'message': '401: Not Authorized'}, 401



class Logout(Resource):

   

    def delete(self): # just add this line!
        session['user_id'] = None
        return {'message': '204: No Content'}, 204

class Sessions(Resource):
    def get(self):
        Sessions = Session.query.all()
        return make_response(
            [Session.to_dict() for Session in Sessions],
            200
        )
api.add_resource(Sessions, '/sessions')



class UserById(Resource):




    def get(self, id):
        user = User.query.filter_by(id = id).first()
        if user == None:
            return make_response({"error":"user not found"}, 404)
        return make_response(user.to_dict(), 200)
    
    def delete(self, id):
        if not session['user_id']:
            return {'error': 'Unauthorized'}, 401
        
        user = User.query.filter_by(id = id).first()
        if user == None:
            return make_response({"error":"user not found"}, 404)
        db.session.delete(user)
        db.session.commit()
        return make_response({"deleted": "she gone"}, 204)
    
    def patch(self, id):
        if not session['user_id']:
            return {'error': 'Unauthorized'}, 401
        user = User.query.filter_by(id = id).first()
        data = request.get_json()
        for attr in data:
            setattr(user, attr, data[attr])
        db.session.add(user)
        db.session.commit()
        return make_response(user.to_dict(), 201)
    
api.add_resource(UserById, "/user/<int:id>")



api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check_session', endpoint='check_session')





if __name__ == '__main__':
    app.run(port=5556, debug=True)

