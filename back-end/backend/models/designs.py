class Designs:
    def __init__(self, data):
        self.__designID = data['designID']
        self.__designName = data['designName']
        self.__designDescription = data['designDescription']
        self.__designPrice = data['designPrice']
        self.__designType = data['designType']
        self.__designImageURI = data['designImageURI']

    def get_design_details(self):
        return {
            "designID": self.__designID,
            "designName": self.__designName,
            'designDescription': self.__designDescription,
            'designPrice': self.__designPrice,
            'designType': self.__designType,
            "designImageURI": self.__designImageURI,
        }

    def update_designs_details(self, data):
        self.__designID = data['designID']
        self.__designName = data['designName']
        self.__designDescription = data['designDescription']
        self.__designPrice = data['designPrice']
        self.__designType = data['designType']
        self.__designImageURI = data['designImageURI']
