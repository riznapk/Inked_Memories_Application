class Orders:
    def __init__(self, data):
        self.__orderID = data['orderID']
        self.__amount = data['amount']
        self.__cartItems = data['cartItems']
        self.__orderPlacedDate = data['orderPlacedDate']
        self.__status = data['status']
        self.__payment = data['payment']

    def get_orders_details(self):
        return {
            "orderID": self.__orderID,
            "amount": self.__amount,
            'cartItems': self.__cartItems,
            'orderPlacedDate': self.__orderPlacedDate,
            'status': self.__status,
            "payment": self.__payment,
        }

    def update_orders_details(self, data):
        self.__orderID = data['orderID']
        self.__amount = data['amount']
        self.__cartItems = data['cartItems']
        self.__orderPlacedDate = data['orderPlacedDate']
        self.__status = data['status']
        self.__payment = data['payment']