
from config import app, api,db, bcrypt
from flask import make_response, redirect, request, session, jsonify
from flask_restful import Resource, Api

from models import User, Pick, Prediction
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'  # Your database URI
# db = SQLAlchemy(app)
import signal


# Define a signal handler that does nothing
def ignore_sigterm(signum, frame):
    pass

# Register the signal handler to ignore SIGTERM
signal.signal(signal.SIGTERM, ignore_sigterm)






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

   

    def delete(self): 
        session['user_id'] = None
        return {'message': '204: No Content'}, 204



api.add_resource(SignUp, '/signup', endpoint='signup')
api.add_resource(Login, '/login', endpoint='login')
api.add_resource(Logout, '/logout', endpoint='logout')



class PicksResource(Resource):
    def post(self):
        data = request.json

        owner = data['owner']
        location = data['location']
        main_event = data['mainEvent']
        predictions = data['predictions']
        user_id = data['user_id']

        # Check if the user has already submitted a pick for the same main event
        existing_pick = Pick.query.filter_by(user_id=user_id, main_event=main_event).first()
        if existing_pick:
            return {'error': 'You have already submitted a pick for this main event'}, 400

        # Create a new Picks object
        new_picks = Pick(user_id=user_id, owner=owner, location=location, main_event=main_event)

        # Create Prediction objects and associate them with the Picks
        for pred in predictions:
            fighters = pred['fighters']
            winner = pred['winner']
            method = pred['method']

            prediction = Prediction(fighters=fighters, winner=winner, method=method,)
            new_picks.predictions.append(prediction)

        # Add and commit the new Picks and associated Predictions to the database
        db.session.add(new_picks)
        db.session.commit()

        return {'message': 'Picks submitted successfully'}, 201

api.add_resource(PicksResource, '/submit-predictions')

class PickResource(Resource):
    def get(self):
        picks = Pick.query.all() 
        picks_data = [{
            "id": pick.id, 
            "owner": pick.owner,
            "location": pick.location,
            "main_event": pick.main_event,
            "predictions": [prediction.as_dict() for prediction in pick.predictions]
        } for pick in picks]
        return make_response(
            {'picks': picks_data},
            200)
    

   
# Add the PickResource to the API with the '/picks' endpoint
api.add_resource(PickResource, '/picks')



class PickByID(Resource):
    def get(self, pick_id):
        pick = Pick.query.filter_by(id=pick_id).first()
        if pick is None:
            return make_response({"error": "Pick not found"}, 404)

        # Define a dictionary representation of the pick object
        pick_dict = {
            "id": pick.id,
            "owner": pick.owner,
            "location": pick.location,
            "main_event": pick.main_event,
            "predictions": [prediction.as_dict() for prediction in pick.predictions]
        }

        return make_response(pick_dict, 200)


    
    def patch(self, pick_id):
        data = request.get_json()

        pick = Pick.query.filter_by(id=pick_id).first()
        if pick is None:
            return make_response({"error": "Pick not found"}, 404)

        # Handle the predictions data from the request
        predictions_data = data.get("predictions")

        # Update or create predictions based on the data
        if predictions_data:
            # Handle the relationship based on your data structure
            pick.predictions = []
            # For example, if predictions is a list of dictionaries:
            for prediction_data in predictions_data:
                prediction_data["picks_id"] = pick.id
                prediction = Prediction(**prediction_data)
                pick.predictions.append(prediction)

        # Commit the changes to the database
        db.session.commit()

        return make_response({"message": "Pick updated successfully"}, 200)
    
        
    


    def delete(self, pick_id):  # Change 'id' to 'pick_id'
        print(f"DELETE request received for pick_id {pick_id}")

        pick = Pick.query.filter_by(id=pick_id).first()
        if pick is None:
            return make_response({"error": "pick not found"}, 404)

        for prediction in pick.predictions:
            db.session.delete(prediction)


        db.session.delete(pick)
        db.session.commit()
        
        return make_response({"deleted": "she gone"}, 204)

    

api.add_resource(PickByID, '/picks/<int:pick_id>')




if __name__ == '__main__':
    
    app.run(port=5556, debug=True)

def run(host='0.0.0.0', port=5556, debug=False):
    signal.signal(signal.SIGTERM, ignore_sigterm)
    app.run(host=host, port=port, debug=debug)

