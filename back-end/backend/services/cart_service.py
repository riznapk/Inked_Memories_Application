from flask import jsonify

from backend.repository.cart_repository import CartRepository

class CartService:
    def __init__(self):
        self.repo = CartRepository()

    # POST a single cart data to database
    def add_single_cart_item(self,body):
        message = body['message']
        cartID = body['cartID']
        orderType = body['orderType']
        scheduledDate = body['scheduledDate']
        designFont = body['designFont']
        designImageURI = body['designImageURI']
        address = body['address']
        userID = body['userID']
        designPrice = body['designPrice']
        isLetterIncluded = body['isLetterIncluded']
        if isLetterIncluded:
            letter = body["letter"]
        else:
            letter = None
        self.repo.add_cart_data({
            "message": message,
            "scheduledDate": scheduledDate,
            "designFont": designFont,
            "orderType": orderType,
            "designImageURI": designImageURI,
            "cartID": cartID,
            "address": address,
            "userID": userID,
            "designPrice": designPrice,
            "isLetterIncluded": isLetterIncluded,
            "letter": letter
        })
        return jsonify({
            'status': 'Item added  to the cart successfully!',
            'message': "success",
        }), 200

    # GET all cart data from database
    def get_all_cart_data(self):

        allData = self.repo.get_all_cart_data()
        dataJson = []
        for data in allData:
            message = data['message']
            scheduledDate = data['scheduledDate']
            designFont = data['designFont']
            designImageURI = data["designImageURI"]
            cartID = data['cartID']
            orderType = data['orderType']
            userID = data['userID']
            address = data['address']
            designPrice = data['designPrice']
            isLetterIncluded = data["isLetterIncluded"]
            letter = data["letter"]
            dataDict = {
                "message": message,
                "scheduledDate": scheduledDate,
                "designFont": designFont,
                "orderType": orderType,
                "designImageURI": designImageURI,
                "cartID": cartID,
                "address": address,
                "userID": userID,
                "designPrice": designPrice,
                "isLetterIncluded": isLetterIncluded,
                "letter": letter
            }
            dataJson.append(dataDict)
        print(dataJson)
        return dataJson


    # DELETE a particular cart item from the database cart collection
    def remove_single_cart_item(self,body):
        cartID = body['cartID']
        self.repo.remove_cart_item(cartID)
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'The product item is deleted!',
                        'message': 'success'
                        }
                       )

    # DELETE all items from the cart in the database cart collection
    def remove_all_cart_item(self):
        self.repo.remove_all_cart_items()
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'All items have been deleted from the cart!',
                        'message': 'success'}
                       )

    # api to get details of cart specific to userID
    def get_cart_data_by_id(self, userID):

        allData = self.repo.get_cart_data_by_user_id(userID)
        cart_list = []
        for data in allData:
            message = data['message']
            scheduledDate = data['scheduledDate']
            designFont = data['designFont']
            designImageURI = data["designImageURI"]
            cartID = data['cartID']
            userID = data['userID']
            address = data['address']
            designPrice = data['designPrice']
            isLetterIncluded = data["isLetterIncluded"]
            letter = data["letter"]
            dataDict = {
                "message": message,
                "scheduledDate": scheduledDate,
                "designFont": designFont,
                "designImageURI": designImageURI,
                "cartID": cartID,
                "address": address,
                "userID": userID,
                "designPrice": designPrice,
                "isLetterIncluded": isLetterIncluded,
                "letter": letter
            }
            cart_list.append(dataDict)
        if cart_list:
            return jsonify(cart_list), 200
        else:
            return jsonify({"error": "No cart items found for the user"}), 400

