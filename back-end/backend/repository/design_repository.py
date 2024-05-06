from backend.db import design_collection


class DesignRepository:
    def __init__(self):
        self.designs = design_collection

    # POST a single design data to database *****Design Upload****
    def add_single_design_data(self, design_data):
        result = self.designs.insert_one(design_data)
        return result

    # finding details of a single designs by if
    def get_single_design_data(self, design_id):
        result = self.designs.find_one({"designID": design_id})
        return result

    # get all designs data
    def get_all_designs(self):
        result = self.designs.find()
        return result

    # DELETE a particular design item from the database cart collection
    def remove_single_design(self, designID):
        result = self.designs.delete_many({'designID': designID})
        return result

    # UPDATE a single design information by id
    def update_single_design_by_id(self, designID, data):
        result = self.designs.update_one(
            {'designID': designID}, {"$set": data})
        return result
