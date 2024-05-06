from backend.db import cart_collection

class CartRepository:
    def __init__(self):
        self.cart = cart_collection

    # add cart data into the db
    def add_cart_data(self, data):
        result = self.cart.insert_one(data)
        return result

    # get all cart data
    def get_all_cart_data(self):
        result = self.cart.find()
        return result

    # delete a perticulat cart data item from db
    def remove_cart_item(self, cartID):
        result = self.cart.delete_many({'cartID': cartID})
        return result

    # remove all data from cart
    def remove_all_cart_items(self):
        result = self.cart.delete_many({})
        return result

    # get details of cart specific to userID
    def get_cart_data_by_user_id(self, userID):
        result = self.cart.find({'userID': userID})
        return result
