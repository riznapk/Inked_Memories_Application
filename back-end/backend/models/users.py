
class Users:
    def _init_(self, data):
        self.__userID = data['userID']
        self.__userFirstName = data['userFirstName']
        self.__userLastName = data['userLastName']
        self.__userEmail = data['userEmail']
        self.__userPhoneNumber = data['userPhoneNumber']
        self.__userProfile = data['userProfile']

    def get_user_details(self):
        return {
            "userID": self.__userID,
            "userFirstName": self.__userFirstName,
            'userLastName': self.__userLastName,
            'userEmail': self.__userEmail,
            'userPhoneNumber': self.__userPhoneNumber,
            "userProfile": self.__userProfile,
        }
