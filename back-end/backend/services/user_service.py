import hashlib
import logging
import secrets
from datetime import timedelta
import datetime

import jwt
from flask import make_response, jsonify

from backend.repository.user_repository import UserRepository


class UserService:
    def __init__(self):
        self.repo = UserRepository()

        # user blocking variables
        self.invalid_attempts = {}
        self.lockout_time = 60 * 1

    def secure_hash(self,inputItem):
        salt = secrets.token_hex(16)
        salted_input = inputItem + salt
        hashed_input = hashlib.sha256(salted_input.encode()).hexdigest()
        return hashed_input, salt

    def handle_invalid_login(self, emailID):
        if emailID in self.invalid_attempts:
            self.invalid_attempts[emailID]['count'] += 1
            self.invalid_attempts[emailID]['timestamp'] = datetime.datetime.utcnow()
        else:
            self.invalid_attempts[emailID] = {'count': 1, 'timestamp': datetime.datetime.utcnow()}

    def check_user_failed_attempt(self,emailID):
        print(emailID, self.invalid_attempts)
        if emailID in self.invalid_attempts and self.invalid_attempts[emailID]['count'] >= 3:
            time_elapsed = datetime.datetime.utcnow() - self.invalid_attempts[emailID]['timestamp']
            time_left = timedelta(seconds=self.lockout_time) - time_elapsed
            minutes, seconds = divmod(time_left.seconds, 60)
            formatted_time_left = f"{minutes:02d}:{seconds:02d}"
            return True, formatted_time_left
        else:
            return False, None

    def generate_jwt_token(userID):
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2),
            'iat': datetime.datetime.utcnow(),
            'sub': userID
        }
        return jwt.encode(payload, "my1213-djnkwknakjdkndksecret-wdkwndkjwn219321key", algorithm='HS256')

    def register_user(self, body):
        userID = body['userID']
        userFirstName = body['userFirstName']
        userLastName = body['userLastName']
        userEmail = body['userEmail']
        userPassword = self.secure_hash(body['userPassword'])
        hashed_password, salt = self.secure_hash(body['userPassword'])
        userPhoneNumber = body['userPhoneNumber']
        userProfile = body['userProfile']
        # Validate fields
        # Checking for missing fields
        try:
            if not userID or not userFirstName or not userLastName or not userEmail or not userPassword or not userPhoneNumber:
                return make_response(jsonify({
                    'status': 'Missing required fields!',
                    'message': 'failure'
                }), 400)
        except Exception as ex:
            print(ex)
        result = self.repo.get_single_user(userEmail)
        print(result, "RESULT")
        if self.repo.get_single_user(userEmail):
            return jsonify({
                'status': 'User already exists!',
                'message': "failure"
            })
        else:
            # If user does not exist, insert new user into the database
            self.repo.add_single_user({
                "userID": userID,
                "userFirstName": userFirstName,
                "userLastName": userLastName,
                "userEmail": userEmail,
                "userPassword": hashed_password,
                "passwordSalt": salt,
                "userPhoneNumber": userPhoneNumber,
                "userProfile": userProfile,
            })

            return jsonify({
                'status': 'User Registered Successfully!',
                'message': "success",
            }), 200

    def all_user_data(self):
        allData = self.repo.get_all_users()
        dataJson = []
        for data in allData:
            userID = data['userID']
            userFirstName = data['userFirstName']
            userLastName = data['userLastName']
            userEmail = data['userEmail']
            userPhoneNumber = data['userPhoneNumber']
            userProfile = data['userProfile']
            dataDict = {
                'userID': userID,
                'userFirstName': userFirstName,
                'userLastName': userLastName,
                'userEmail': userEmail,
                'userPhoneNumber': userPhoneNumber,
                'userProfile': userProfile,
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)

    def get_user_details_by_email(self, userEmail):
        data = self.repo.get_single_user(userEmail)
        userID = data['userID']
        userFirstName = data['userFirstName']
        userLastName = data['userLastName']
        userEmail = data['userEmail']
        userPhoneNumber = data['userPhoneNumber']
        userProfile = data['userProfile']

        dataDict = {
            'userID': userID,
            'userFirstName': userFirstName,
            'userLastName': userLastName,
            'userEmail': userEmail,
            'userPhoneNumber': userPhoneNumber,
            'userProfile': userProfile,

        }
        print(dataDict)
        return jsonify(dataDict)

    def sign_in(self,body):
        userEmail = body['userEmail']
        userPassword = body['userPassword']
        user =self.repo.get_single_user(userEmail)
        print("hi")

        # Validate fields
        # Checking for missing fields
        if not userEmail or not userPassword:
            return jsonify({
                'status': 'Missing required fields!',
                'message': 'failure'
            })

        if user:
            hashed_password = user['userPassword']
            salt = user['passwordSalt']
            salted_input = userPassword + salt
            input_hash = hashlib.sha256(salted_input.encode()).hexdigest()
            isUserTriesExceeded, timeLeft = self.check_user_failed_attempt(userEmail)

            if isUserTriesExceeded:
                logging.warning("User Tries exceeded the maximum allowed")
                return jsonify({
                    'status': 'Maximum number of tries exceeded! Please try after ' + timeLeft,
                    'message': "failure"
                }), 401
            if input_hash == hashed_password:

                # If user is found in the database, generate JWT token and return it in the response
                token = self.generate_jwt_token(str(user['userID']))
                response = make_response(jsonify({'status': 'User authenticated successfully!', 'message': "success"}))
                response.set_cookie(key='token', value=token, httponly=True, secure=True, samesite="None")
                return response

            else:
                self.handle_invalid_login(userEmail)
                logging.error("Invalid email or password!")
                return jsonify({
                    'status': 'Invalid email or password!',
                    'message': "failure"
                }), 401
        else:
            return jsonify({
                'status': 'User not found!',
                'message': "failure"
            })

