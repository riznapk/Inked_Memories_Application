from flask import jsonify

from backend.repository.design_repository import DesignRepository


class DesignService:
    def __init__(self):
        self.repo = DesignRepository()

    # POST a single design data to database *****Design Upload****
    def add_design_data(self, body):
        designID = body['designID']
        designName = body['designName']
        designDescription = body['designDescription']
        designPrice = body['designPrice']
        designType = body['designType']
        designImageURI = body['designImageURI']

        if self.repo.get_single_design_data(designID):
            return jsonify({
                'status': 'Design already exists!',
                'message': "failure"
            })
        else:
            self.repo.add_single_design_data({
                "designID": designID,
                "designName": designName,
                "designDescription": designDescription,
                "designPrice": designPrice,
                "designType": designType,
                "designImageURI": designImageURI,
            })

            return jsonify({
                'status': 'Design Added Successfully!',
                'message': "success",
            }), 200

    # get all design data from the database
    def get_all_design_data(self):
        allData = self.repo.get_all_designs()
        dataJson = []
        for data in allData:
            designID = data['designID']
            designName = data['designName']
            designDescription = data['designDescription']
            designPrice = data['designPrice']
            designImageURI = data['designImageURI']
            designType = data['designType']
            dataDict = {
                "designID": designID,
                "designName": designName,
                "designDescription": designDescription,
                "designPrice": designPrice,
                "designImageURI": designImageURI,
                "designType": designType,
            }
            dataJson.append(dataDict)
        print(dataJson)
        return jsonify(dataJson)

    # DELETE a particular design item from the database cart collection
    def delete_single_design(self, body):
        designID = body['designID']
        self.repo.remove_single_design(designID)
        # db['designs'].delete_many({'designID': designID})
        print('\n # Deletion successful # \n')
        return jsonify({'status': 'The design item is deleted!',
                        'message': 'success'
                        }
                       )

    # UPDATE a single design information by id
    def update_single_design_by_id(self, body):
        designID = body['designID']
        designName = body['designName']
        designDescription = body['designDescription']
        designPrice = body['designPrice']
        designType = body['designType']
        designImageURI = body['designImageURI']
        self.repo.update_single_design_by_id(designID, {
            "designID": designID,
            "designName": designName,
            "designDescription": designDescription,
            "designPrice": designPrice,
            "designType": designType,
            "designImageURI": designImageURI,
        })
        print('\n # Update on design details is successful # \n')
        return jsonify({'status': 'design data with ID: ' + designID + ' is updated!', 'message': 'success'})
