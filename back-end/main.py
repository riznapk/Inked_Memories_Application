from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from functools import wraps
from dotenv import load_dotenv
from datetime import timedelta
from flask import make_response
import os
import hashlib
import jwt
import datetime
import secrets
import logging
# stripe import
import stripe

from backend.services.design_service import DesignService
from backend.services.cart_service import CartService
from backend.services.order_service import OrderService
from backend.services.user_service import UserService

app = Flask(__name__)

# loading env file
load_dotenv(".env")

# connecting to mongoDB
client = MongoClient(os.environ.get('DATABASE_URL'))
# for testing
# client = MongoClient("mongodb+srv://darkPhoenix:XqxZYX3FLyN2ImmC@cluster1.6zaaixz.mongodb.net")


# db connection
db = client['inked-memories']

# for testing
# app_cors_url = "http://localhost:3000"
app_cors_url = os.environ.get('APP_CORS_URL')

# CORS(app)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": app_cors_url}})

# JWT security key
SECRET_KEY = os.environ.get('SECRET_KEY')
# for testing
# SECRET_KEY = "my1213-djnkwknakjdkndksecret-wdkwndkjwn219321key"


# user blocking variables
invalid_attempts = {}
lockout_time = 60 * 1

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# setting stripe api key
stripe.api_key = os.environ.get("STRIPE_API_KEY")


def authenticate_token():
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            token = None
            if "token" in request.cookies:
                token = request.cookies.get('token')
            if not token:
                return jsonify({'message': 'Token is missing!'}), 401
            try:
                decoded_token = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
                return func(*args, **kwargs)
            except jwt.ExpiredSignatureError:
                return jsonify({'message': 'Token has expired!'}), 401
            except jwt.InvalidTokenError:
                return jsonify({'message': 'Invalid token!'}), 401

        return wrapper

    return decorator


# Hashing function
def secure_hash(inputItem):
    salt = secrets.token_hex(16)
    salted_input = inputItem + salt
    hashed_input = hashlib.sha256(salted_input.encode()).hexdigest()
    return hashed_input, salt


def generate_jwt_token(userID):
    payload = {
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2),
        'iat': datetime.datetime.utcnow(),
        'sub': userID
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')


def handle_invalid_login(emailID):
    if emailID in invalid_attempts:
        invalid_attempts[emailID]['count'] += 1
        invalid_attempts[emailID]['timestamp'] = datetime.datetime.utcnow()
    else:
        invalid_attempts[emailID] = {'count': 1, 'timestamp': datetime.datetime.utcnow()}


def check_user_failed_attempt(emailID):
    print(emailID, invalid_attempts)
    if emailID in invalid_attempts and invalid_attempts[emailID]['count'] >= 3:
        time_elapsed = datetime.datetime.utcnow() - invalid_attempts[emailID]['timestamp']
        time_left = timedelta(seconds=lockout_time) - time_elapsed
        minutes, seconds = divmod(time_left.seconds, 60)
        formatted_time_left = f"{minutes:02d}:{seconds:02d}"
        return True, formatted_time_left
    else:
        return False, None


# APIs to post, fetch information regarding users
@app.route('/users', methods=['POST', 'GET', "PUT"])
def userData():
    user_service = UserService()
    # POST a single user data to database *****REGISTER USER****
    if request.method == 'POST':
        # Log request data
        logging.info(f'Request received: {request.json}')

        body = request.json
        return user_service.register_user(body)
        # userID = body['userID']
        # userFirstName = body['userFirstName']
        # userLastName = body['userLastName']
        # userEmail = body['userEmail']
        # userPassword = secure_hash(body['userPassword'])
        # hashed_password, salt = secure_hash(body['userPassword'])
        # userPhoneNumber = body['userPhoneNumber']
        # userProfile = body['userProfile']

        # # Validate fields
        # # Checking for missing fields
        # try:
        #     if not userID or not userFirstName or not userLastName or not userEmail or not userPassword or not userPhoneNumber:
        #         return make_response(jsonify({
        #             'status': 'Missing required fields!',
        #             'message': 'failure'
        #         }), 400)
        # except Exception as ex:
        #     print(ex)
        # result = db['users'].find_one({"userEmail": userEmail})
        # print(result, "RESULT")
        # if db['users'].find_one({"userEmail": userEmail}):
        #     return jsonify({
        #         'status': 'User already exists!',
        #         'message': "failure"
        #     })
        # else:
        #     # If user does not exist, insert new user into the database
        #     db['users'].insert_one({
        #         "userID": userID,
        #         "userFirstName": userFirstName,
        #         "userLastName": userLastName,
        #         "userEmail": userEmail,
        #         "userPassword": hashed_password,
        #         "passwordSalt": salt,
        #         "userPhoneNumber": userPhoneNumber,
        #         "userProfile": userProfile,
        #     })
        #
        #     return jsonify({
        #         'status': 'User Registered Successfully!',
        #         'message': "success",
        #     }), 200

    # GET all user data from database
    if request.method == 'GET':
        return user_service.all_user_data()
        # allData = db['users'].find()
        # dataJson = []
        # for data in allData:
        #     userID = data['userID']
        #     userFirstName = data['userFirstName']
        #     userLastName = data['userLastName']
        #     userEmail = data['userEmail']
        #     userPhoneNumber = data['userPhoneNumber']
        #     userProfile = data['userProfile']
        #     dataDict = {
        #         'userID': userID,
        #         'userFirstName': userFirstName,
        #         'userLastName': userLastName,
        #         'userEmail': userEmail,
        #         'userPhoneNumber': userPhoneNumber,
        #         'userProfile': userProfile,
        #     }
        #     dataJson.append(dataDict)
        # print(dataJson)
        # return jsonify(dataJson)

    # if request.method == 'PUT':
    #     logging.info(f'Request received: {request.json}')
    #     body = request.json
    #     userID = body['userID']
    #     userFirstName = body['userFirstName']
    #     userLastName = body['userLastName']
    #     userEmail = body['userEmail']
    #     userPhoneNumber = body['userPhoneNumber']
    #
    #     db['users'].update_one(
    #         {'userID': userID},
    #         {
    #             "$set": {
    #                 'userFirstName': userFirstName,
    #                 'userLastName': userLastName,
    #                 'userEmail': userEmail,
    #                 'userPhoneNumber': userPhoneNumber,
    #             }
    #         }
    #     )
    #     print('\n # Update on user details is successful # \n')
    #     return jsonify({'status': 'user data with ID: ' + userID + ' is updated!', 'message': 'success'})


# api to get details of a specific user by email
@app.route('/users/<string:userEmail>', methods=['GET'])
def getUserDetails(userEmail):
    user_service = UserService()
    # GET a specific data by userID
    if request.method == 'GET':
        return user_service.get_user_details_by_email(userEmail)
        # data = db['users'].find_one({'userEmail': userEmail})
        # userID = data['userID']
        # userFirstName = data['userFirstName']
        # userLastName = data['userLastName']
        # userEmail = data['userEmail']
        # userPhoneNumber = data['userPhoneNumber']
        # userProfile = data['userProfile']
        #
        # dataDict = {
        #     'userID': userID,
        #     'userFirstName': userFirstName,
        #     'userLastName': userLastName,
        #     'userEmail': userEmail,
        #     'userPhoneNumber': userPhoneNumber,
        #     'userProfile': userProfile,
        #
        # }
        # print(dataDict)
        # return jsonify(dataDict)


# api to get the user signin to the application - authentication
@app.route('/users/signin', methods=['POST'])
def signin():
    body = request.json
    userEmail = body['userEmail']
    userPassword = body['userPassword']
    user = db['users'].find_one({"userEmail": userEmail})
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
        isUserTriesExceeded, timeLeft = check_user_failed_attempt(userEmail)

        if isUserTriesExceeded:
            logging.warning("User Tries exceeded the maximum allowed")
            return jsonify({
                'status': 'Maximum number of tries exceeded! Please try after ' + timeLeft,
                'message': "failure"
            }), 401
        if input_hash == hashed_password:

            # If user is found in the database, generate JWT token and return it in the response
            token = generate_jwt_token(str(user['userID']))
            response = make_response(jsonify({'status': 'User authenticated successfully!', 'message': "success"}))
            response.set_cookie(key='token', value=token, httponly=True, secure=True, samesite="None")
            return response

        else:
            handle_invalid_login(userEmail)
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


# APIs to post, fetch design detail
@app.route('/designs', methods=['POST', 'GET', 'PUT', 'DELETE'])
def designsData():
    # POST a single design data to database *****Design Upload****
    design_service = DesignService()
    if request.method == 'POST':
        body = request.json
        return design_service.add_design_data(body)

    # GET all design data from database
    if request.method == 'GET':
        return design_service.get_all_design_data()

    # DELETE a particular design item from the database cart collection
    if request.method == 'DELETE':
        body = request.json
        return design_service.delete_single_design(body)

    # UPDATE a single order information by id
    if request.method == 'PUT':
        logging.info(f'Request received: {request.json}')
        body = request.json
        return design_service.update_single_design_by_id(body)


# APIs to post, fetch, update cart details
@app.route('/cart', methods=['POST', 'GET', 'DELETE'])
def designData():
    cart_service = CartService()
    # POST a single cart data to database
    if request.method == 'POST':
        body = request.json
        return cart_service.add_single_cart_item(body)

    # GET all cart data from database
    if request.method == 'GET':
        return cart_service.get_all_cart_data()

    # DELETE a particular cart item from the database cart collection
    if request.method == 'DELETE':
        body = request.json
        return cart_service.remove_single_cart_item(body)


@app.route('/cart/remove', methods=['DELETE'])
def deleteAllCartData():
    cart_service = CartService()
    # DELETE all items from the cart in the database cart collection
    if request.method == 'DELETE':
        return cart_service.remove_all_cart_item()


# api to get details of cart specific to userID
@app.route('/cart/<string:userID>', methods=['GET'])
def getUserCartDetails(userID):
    cart_service = CartService()
    # GET a user specific cart details
    if request.method == 'GET':
        return cart_service.get_cart_data_by_id(userID)


# To send the publishable key to the front-end
@app.route('/stripe-config', methods=['GET'])
def config():
    if request.method == "GET":
        return jsonify({
            "publishableKey": os.environ.get('STRIPE_PUBLISHABLE_KEY')
        })


# Payment with stripe
@app.route('/payment', methods=['POST'])
def payment():
    if request.method == 'POST':
        try:
            body = request.json
            userEmail = body['userEmail']
            amount = body['amount']

            if not userEmail:
                return jsonify({'message': 'Email is required for status update'}), 400

            intent = stripe.PaymentIntent.create(
                amount=amount,
                currency='gbp',
                automatic_payment_methods={'enabled': True},
                receipt_email=userEmail
            )

            return {"client_secret": intent['client_secret']}, 200
        except Exception as e:
            return {"error": str(e)}, 500


# @app.route('/webhook', methods=['POST'])
# def webhook():
#     payload = request.get_data()
#     sig_header = request.headers.get('Stripe_Signature', None)
#
#     if not sig_header:
#         return 'No Signature Header!', 400
#
#     try:
#         event = stripe.Webhook.construct_event(
#             payload, sig_header, endpoint_secret
#         )
#     except ValueError as e:
#         # Invalid payload
#         return 'Invalid payload', 400
#     except stripe.error.SignatureVerificationError as e:
#         # Invalid signature
#         return 'Invalid signature', 400
#
#     if event['type'] == 'payment_intent.succeeded':
#         email = event['data']['object'][
#             'receipt_email']  # contains the email that will recive the recipt for the payment (users email usually)
#
#         user_info['paid_50'] = True
#         user_info['email'] = email
#     else:
#         return 'Unexpected event type', 400
#
#     return '', 200

# api to update orders database
@app.route('/orders', methods=['POST', 'GET', 'DELETE', 'PUT'])
def orderData():
    order_service = OrderService()
    if request.method == 'POST':
        body = request.json
        return order_service.add_order_data(body)

    # GET all order data from database
    if request.method == 'GET':
        return order_service.get_all_order_data()
        # allData = db['orders'].find()
        # dataJson = []
        # for data in allData:
        #     orderID = data['orderID']
        #     amount = data['amount']
        #     cartItems = data['cartItems']
        #     orderPlacedDate = data['orderPlacedDate']
        #     status = data['status']
        #     payment = data['payment']
        #     dataDict = {
        #         'orderID': orderID,
        #         'amount': amount,
        #         'cartItems': cartItems,
        #         'orderPlacedDate': orderPlacedDate,
        #         'status': status,
        #         'payment': payment
        #     }
        #     dataJson.append(dataDict)
        # print(dataJson)
        # return jsonify(dataJson)

    # UPDATE a single order information by id
    if request.method == 'PUT':
        logging.info(f'Request received: {request.json}')
        body = request.json
        return order_service.update_single_order(body)
        # orderID = body['orderID']
        # status = body['status']
        # db['orders'].update_one(
        #     {'orderID': orderID},
        #     {
        #         "$set": {
        #             "orderID": orderID,
        #             "status": status,
        #         }
        #     }
        # )
        # print('\n # Update on order details is successful # \n')
        # return jsonify({'status': 'vehicle data with ID: ' + orderID + ' is updated!', 'message': 'success'})


@app.route('/orders/<string:userID>', methods=['GET'])
def getUserOrderDetails(userID):
    order_service = OrderService()
    # GET a user specific cart details
    if request.method == 'GET':
        return order_service.get_order_details_by_id(userID)

if __name__ == '__main__':
    app.debug = True
    app.run(port=5001)
