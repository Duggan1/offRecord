
from config import app, api,db, bcrypt
from flask import make_response, redirect, request, session, jsonify
from flask_restful import Resource, Api

from models import User, Pick, Prediction, UFCEvent, UFCFight, League
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
        return "Welcome to the OFF THE RECORD PICKS Backend!"

api.add_resource(Root, '/')  
class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response(
            [user.to_dict() for user in users],
            200
        )

api.add_resource(Users, '/users')

class UserProfile(Resource):
    def patch(self, user_id):
        user = User.query.get(user_id)

        if not user:
            return {"message": "User not found"}, 404

        data = request.get_json()

        # Update user attributes based on the data received in the PATCH request
        if 'fullname' in data:
            user.fullname = data['fullname']

        if 'email' in data:
            user.email = data['email']

        if 'image' in data:
            user.image = data['image']

        db.session.commit()

        return {"message": "User updated successfully"}, 200
    
api.add_resource(UserProfile, '/users/<int:user_id>')

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


# class Leagues(Resource):
#     def get(self):
#         # Return a list of all leagues
#         leagues = League.query.all()
#         return {'leagues': [league.name for league in leagues]}

#     def post(self):
#         # Create a new league
#         data = request.get_json()
#         name = data.get('name')
#         owner_id = data.get('owner_id')  # ID of the league owner (user)
#         passcode = data.get('passcode')  # Optional passcode for joining the league

#         if not name or not owner_id:
#             return {'error': 'Name and owner_id are required'}, 400

#         # Check if the owner_id corresponds to an existing user
#         owner = User.query.get(owner_id)
#         if not owner:
#             return {'error': 'Invalid owner_id'}, 400

#         # Create a new league
#         new_league = League(name=name, owner=owner, passcode=passcode)
#         db.session.add(new_league)
#         db.session.commit()

#         return {'message': 'League created successfully', 'league_id': new_league.id}

#     def patch(self, league_id):
#         # Update an existing league
#         data = request.get_json()
#         new_owner_id = data.get('new_owner_id')  # Optional: change league owner

#         league = League.query.get(league_id)
#         if not league:
#             return {'error': 'League not found'}, 404

#         if new_owner_id:
#             new_owner = User.query.get(new_owner_id)
#             if not new_owner:
#                 return {'error': 'Invalid new_owner_id'}, 400

#             league.owner = new_owner

#         db.session.commit()

#         return {'message': 'League updated successfully'}

#     def delete(self, league_id):
#         # Delete an existing league
#         league = League.query.get(league_id)
#         if not league:
#             return {'error': 'League not found'}, 404

#         db.session.delete(league)
#         db.session.commit()

#         return {'message': 'League deleted successfully'}


class Leagues(Resource):
    def get(self):
        # Return a list of all leagues
        leagues = League.query.all()

        league_data = [{
            'id': league.id,
            'name': league.name,
            'owner_id': league.owner_id,
            'message': league.message,
            'image': league.image,
            'members': [{'image': member.image, 'username': member.username, 'id': member.id} for member in league.members],
            'passcode': league.passcode
        } for league in leagues]

        return {'leagues': league_data}




    def post(self):
        # Create a new league
        data = request.get_json()
        name = data.get('name')
        owner_id = data.get('owner_id')
        message = data.get('message')
        image = data.get('image')
        members = data.get('members')
        passcode = data.get('passcode')

        if not name or not owner_id:
            return {'message': 'Missing required data'}, 400

        # Check if the user (owner) exists
        owner = User.query.get(owner_id)
        if not owner:
            return {'message': 'User not found'}, 404

        # Check if the league name is unique
        if League.query.filter_by(name=name).first():
            return {'message': 'League name must be unique'}, 400

        # Create a new league
        new_league = League(name=name, owner_id=owner_id, message=message,image=image,members=members,passcode=passcode)
        db.session.add(new_league)
        db.session.commit()

        return {'message': 'League created successfully', 'league_id': new_league.id}, 201

class LeagueMembers(Resource):
    def patch(self, league_id):
        # Join a league
        data = request.get_json()
        user_id = data.get('user_id')

        if not user_id:
            return {'message': 'Missing user_id'}, 400

        # Check if the league exists
        league = League.query.get(league_id)
        if not league:
            return {'message': 'League not found'}, 404

        # Check if the user exists
        user = User.query.get(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        # Add the user to the league
        league.members.append(user)
        db.session.commit()

        return {'message': 'User joined the league successfully'}, 200

    def delete(self, league_id):
        # Delete a league
        league = League.query.get(league_id)
        if not league:
            return {'message': 'League not found'}, 404

        db.session.delete(league)
        db.session.commit()

        return {'message': 'League deleted successfully'}, 200

api.add_resource(Leagues, '/leagues')
api.add_resource(LeagueMembers, '/leagues/<int:league_id>/members')




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
            round = pred.get('round')  # Use get to safely retrieve the value or None

    # You can now check if 'round' is not None before using it
            if round is not None:
                # 'round' has a value, you can use it as needed
                prediction = Prediction(fighters=fighters, winner=winner, method=method, round=round)
            else:
                # 'round' is None, handle this case accordingly
                prediction = Prediction(fighters=fighters, winner=winner, method=method)
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


class UFCEventResource(Resource):
    def post(self):
        data = request.json

        event_name = data['event_name']
        locationCC = data['locationCC']
        backgroundImageSrc = data['backgroundImageSrc']
        tapImage = data['tapImage']
        fights = data['fights']
        # records = data['records']

        # Check if the user has already submitted a pick for the same main event
        existing_event = UFCEvent.query.filter_by(event_name=event_name, locationCC=locationCC).first()
        if existing_event:
            return {'error': 'You have already submitted for this main event'}, 400

        # Create a new UFCEvent object
        new_event = UFCEvent(event_name=event_name, locationCC=locationCC, 
                             backgroundImageSrc=backgroundImageSrc, tapImage=tapImage)

        # Create UFCFight objects and associate them with the UFCEvent
        # Create UFCFight objects and associate them with the UFCEvent
        for fight in fights:
            weight_class = fight['weightClass']
            red_corner_name = fight['redCornerName']
            blue_corner_name = fight['blueCornerName']
            red_corner_country = fight['redCornerCountry']
            blue_corner_country = fight['blueCornerCountry']
            red_corner_image = fight['redCornerImage']
            blue_corner_image = fight['blueCornerImage']

            # Access records directly using the loop variable
            red_corner_record = fight['redCornerRecord']
            blue_corner_record = fight['blueCornerRecord']

            method = fight['method']
            round = fight['round']
            winner = fight['winner']
            odds = fight['odds']
            

            ufc_fight = UFCFight(weight_class=weight_class, red_corner_name=red_corner_name,
                                blue_corner_name=blue_corner_name, red_corner_country=red_corner_country,
                                blue_corner_country=blue_corner_country, blue_corner_image=blue_corner_image, red_corner_image=red_corner_image, red_corner_record=red_corner_record,
                                blue_corner_record=blue_corner_record, method=method, round=round, winner=winner, odds=odds)
            new_event.fights.append(ufc_fight)


        # Add and commit the new UFCEvent and associated UFCFights to the database
        db.session.add(new_event)
        db.session.commit()

        return {'message': 'UFC event submitted successfully'}, 201

api.add_resource(UFCEventResource, '/submit-ufc-event')

class UFCEventsResource(Resource):
    def get(self):
        # Retrieve all UFC events from the database
        ufc_events = UFCEvent.query.all()

        # Serialize the UFC events to JSON
        ufc_events_data = []
        for event in ufc_events:
            event_data = {
                'id': event.id,
                'event_name': event.event_name,
                'locationCC': event.locationCC,
                'backgroundImageSrc': event.backgroundImageSrc,
                'tapImage': event.tapImage,
                'fights': [],
                # 'records': [],
            }

            for fight in event.fights:
                fight_data = {
                    'weightClass': fight.weight_class,
                    'redCornerName': fight.red_corner_name,
                    'blueCornerName': fight.blue_corner_name,
                    'redCornerCountry': fight.red_corner_country,
                    'blueCornerCountry': fight.blue_corner_country,
                    'redCornerImage': fight.red_corner_image,
                    'blueCornerImage': fight.blue_corner_image,
                    'redCornerRecord': fight.red_corner_record,
                    'blueCornerRecord': fight.blue_corner_record,
                    'method': fight.method,
                    'round': fight.round,
                    'winner': fight.winner,
                    'odds': fight.odds,
                }
                event_data['fights'].append(fight_data)

            # for record in event.records:
            #     record_data = {
            #         # 'redCornerName': record.red_corner_name,
            #         # 'blueCornerName': record.blue_corner_name,
            #         'redCornerRecord': record.red_corner_record,
            #         'blueCornerRecord': record.blue_corner_record,
            #     }
            #     event_data['records'].append(record_data)

            ufc_events_data.append(event_data)

        return {'ufc_events': ufc_events_data}

api.add_resource(UFCEventsResource, '/events')







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
            pick.predictions.delete()
            # For example, if predictions is a list of dictionaries:
            for prediction_data in predictions_data:
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
        
        pick.predictions.delete()

        for prediction in pick.predictions:
            db.session.delete(prediction)

        
        db.session.delete(pick)
        db.session.commit()
        
        return make_response({"deleted": "she gone"}, 204)

api.add_resource(PickByID, '/picks/<int:pick_id>')

class UFCEventByID(Resource):
    def get(self, event_id):
        # Retrieve the UFC event from the database by ID
        ufc_event = UFCEvent.query.get(event_id)

        if ufc_event is None:
            return make_response({"error": "Event not found"}, 404)

        # Serialize the UFC event to JSON
        event_data = {
            'event_name': ufc_event.event_name,
            'locationCC': ufc_event.locationCC,
            'backgroundImageSrc': ufc_event.backgroundImageSrc,
            'tapImage': ufc_event.tapImage,
            'fights': [],
        }

        for fight in ufc_event.fights:
            fight_data = {
                'weightClass': fight.weight_class,
                'redCornerName': fight.red_corner_name,
                'blueCornerName': fight.blue_corner_name,
                'redCornerCountry': fight.red_corner_country,
                'blueCornerCountry': fight.blue_corner_country,
                'redCornerImage': fight.red_corner_image,
                'blueCornerImage': fight.blue_corner_image,
                'redCornerRecord': fight.red_corner_record,
                'blueCornerRecord': fight.blue_corner_record,
                'method': fight.method,
                'round': fight.round,
                'winner': fight.winner,
                'odds': fight.odds,
            }
            event_data['fights'].append(fight_data)

        return {'ufc_event': event_data}

    def patch(self, event_id):
    # Retrieve the UFC event from the database by ID
        ufc_event = UFCEvent.query.get(event_id)

        if ufc_event is None:
            return make_response({"error": "Event not found"}, 404)

        # Get the JSON data from the request
        data = request.get_json()

         # Update fields
        ufc_event.backgroundImageSrc = data.get("backgroundImageSrc", ufc_event.backgroundImageSrc)
        ufc_event.tapImage = data.get("tapImage", ufc_event.tapImage)
        ufc_event.locationCC = data.get("locationCC", ufc_event.locationCC)
        ufc_event.event_name = data.get("event_name", ufc_event.event_name)

        # Handle the fights data from the request
        fights_data = data.get("fights")

        # Update or create fights based on the data
        if fights_data:
            # Handle the relationship based on your data structure
            ufc_event.fights.delete()
            # For example, if fights is a list of dictionaries:
            for fight_data in fights_data:
                fight = UFCFight(**fight_data)
                ufc_event.fights.append(fight)

        # Commit changes to the database
        db.session.commit()

        return {'message': 'UFC event updated successfully'}


    def delete(self, event_id):
        # Retrieve the UFC event from the database by ID
        ufc_event = UFCEvent.query.get(event_id)

        if ufc_event is None:
            return make_response({"error": "Event not found"}, 404)

        # Delete the UFC event
        db.session.delete(ufc_event)
        db.session.commit()

        return {'message': 'UFC event deleted successfully'}

# Add the resource to the API
api.add_resource(UFCEventByID, '/events/<int:event_id>')


if __name__ == '__main__':
    
    app.run(port=5556, debug=True)

def run(host='0.0.0.0', port=5556, debug=False):
    signal.signal(signal.SIGTERM, ignore_sigterm)
    app.run(host=host, port=port, debug=debug)

