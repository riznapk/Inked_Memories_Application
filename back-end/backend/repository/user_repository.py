from backend.db import user_collection


class UserRepository:
    def __init__(self):
        self.users = user_collection

    # registering user, add one user data to the db
    def add_single_user(self, user):
        result = self.users.insert_one(user)
        return result

    # finding details of a single user
    def get_single_user(self, user_email):
        result = self.users.find_one({"userEmail": user_email})
        return result

    # get all user data
    def get_all_users(self):
        result = self.users.find()
        return result
