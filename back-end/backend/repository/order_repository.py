from backend.db import order_collection


class OrderRepository:
    def __init__(self):
        self.orders = order_collection

    # adding one order data to the db
    def add_single_order(self, order_data):
        result = self.orders.insert_one(order_data)
        return result

    # UPDATE a single order information by id
    def update_single_order_by_id(self, order_id, data):
        result = self.orders.update_one({"orderID": order_id}, {"$set": data})
        return result

    # GET a order specific order details
    def get_all_orders_by_id(self, order_id):
        result = self.orders.find({'orderID': order_id})
        return result

    # GET all  order details by userid
    def get_all_orders_by_user_id(self, user_id):
        result = self.orders.find({'userID': user_id})
        return result

    # GET all order details
    def get_all_orders(self):
        result = self.orders.find()
        return result
