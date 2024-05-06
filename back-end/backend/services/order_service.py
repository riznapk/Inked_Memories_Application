from flask import jsonify

from backend.repository.order_repository import OrderRepository

class OrderService:
    def __init__(self):
        self.repo = OrderRepository()

    def add_order_data(self,body):
        amount = body['amount']
        orderID = body['orderID']
        cartItems = body['cartItems']
        userID = body['userID']
        orderPlacedDate = body['orderPlacedDate']
        status = body['status']
        payment = body['payment']
        self.repo.add_single_order({
            "amount": amount,
            "orderID": orderID,
            "cartItems": cartItems,
            "userID": userID,
            "orderPlacedDate": orderPlacedDate,
            'status': status,
            'payment': payment
        })
        return jsonify({
            'status': 'Order Placed!',
            'message': "success",
        }), 200

    # GET all order data from database
    def get_all_order_data(self):
        allData = self.repo.get_all_orders()
        print("hello")
        dataJson = []
        for data in allData:
            print("hello2")
            orderID = data['orderID']
            amount = data['amount']
            cartItems = data['cartItems']
            orderPlacedDate = data['orderPlacedDate']
            status = data['status']
            payment = data['payment']
            dataDict = {
                'orderID': orderID,
                'amount': amount,
                'cartItems': cartItems,
                'orderPlacedDate': orderPlacedDate,
                'status': status,
                'payment': payment
            }
            dataJson.append(dataDict)
        print("hi")
        print(dataJson)
        return jsonify(dataJson)

    # UPDATE a single order information by id
    def update_single_order(self,body):
        orderID = body['orderID']
        status = body['status']
        self.repo.update_single_order_by_id(orderID,{
                    "orderID": orderID,
                    "status": status,
                })
        print('\n # Update on order details is successful # \n')
        return jsonify({'status': 'order data with ID: ' + orderID + ' is updated!', 'message': 'success'})

    # get order details by id
    def get_order_details_by_id(self,userID):
        allData = self.repo.get_all_orders_by_user_id(userID)
        order_list = []
        for data in allData:
            orderID = data['orderID']
            amount = data['amount']
            cartItems = data['cartItems']
            orderPlacedDate = data['orderPlacedDate']
            status = data['status']
            payment = data['payment']
            dataDict = {
                'orderID': orderID,
                'amount': amount,
                'cartItems': cartItems,
                'orderPlacedDate': orderPlacedDate,
                'status': status,
                'payment': payment
            }
            order_list.append(dataDict)
        if order_list:
            return jsonify(order_list), 200
        else:
            return jsonify({"error": "No placed orders found for the user"}), 200
