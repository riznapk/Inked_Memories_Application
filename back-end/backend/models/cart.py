
class Cart:
    def __init__(self, data):
        self.__userID = data['userID']
        self.__message = data['message']
        self.__scheduledDate = data['scheduledDate']
        self.__designFont = data['designFont']
        self.__orderType = data['orderType']
        self.__designImageURI = data['designImageURI']
        self.__cartID = data['cartID']
        self.__address = data['address']
        self.__designPrice = data['designPrice']
        self.__isLetterIncluded = data['isLetterIncluded']
        self.__letter = data['letter']

    def get_orders_details(self):
        return {
            "userID": self.__userID,
            "message": self.__message,
            'scheduledDate': self.__scheduledDate,
            'designFont': self.__designFont,
            'orderType': self.__orderType,
            "designImageURI": self.__designImageURI,
            "cartID": self.__cartID,
            "address": self.__address,
            "designPrice": self.__designPrice,
            "isLetterIncluded": self.__isLetterIncluded,
            "letter": self.__letter,
        }

    def update_orders_details(self, data):
        self.__userID = data['userID']
        self.__message = data['message']
        self.__scheduledDate = data['scheduledDate']
        self.__designFont = data['designFont']
        self.__orderType = data['orderType']
        self.__designImageURI = data['designImageURI']
        self.__cartID = data['cartID']
        self.__address = data['address']
        self.__designPrice = data['designPrice']
        self.__isLetterIncluded = data['isLetterIncluded']
        self.__letter = data['letter']