import unittest
from unittest.mock import MagicMock
from flask import Response, jsonify
from backend.services.user_service import UserService
from main import app

class TestUserService(unittest.TestCase):

    def setUp(self):
        self.user_service = UserService()
        self.app = app.test_client()
        self.app_context = app.test_request_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_register_user(self):
        self.user_service.repo.get_single_user = MagicMock()
        self.user_service.repo.get_single_user.return_value = None
        self.user_service.repo.add_single_user = MagicMock()

        response = self.user_service.register_user({
            "userID": "user123",
            "userFirstName": "John",
            "userLastName": "Doe",
            "userEmail": "john@example.com",
            "userPassword": "password123",
            "userPhoneNumber": "1234567890",
            "userProfile": "profile_data"
        })

        self.user_service.repo.add_single_user.assert_called_once()
        self.assertEqual(response[1], 200)
        self.assertIn('User Registered Successfully!', response[0].get_data(as_text=True))

    def test_all_user_data(self):
        self.user_service.repo.get_all_users = MagicMock()
        self.user_service.repo.get_all_users.return_value = [
            {
                "userID": "user123",
                "userFirstName": "John",
                "userLastName": "Doe",
                "userEmail": "john@example.com",
                "userPhoneNumber": "1234567890",
                "userProfile": "profile_data"
            }
        ]

        response = self.user_service.all_user_data()

        self.assertEqual(len(response.json), 1)
        self.assertEqual(response.json[0]["userID"], "user123")

    def test_get_user_details_by_email(self):
        self.user_service.repo.get_single_user = MagicMock()
        self.user_service.repo.get_single_user.return_value = {
            "userID": "user123",
            "userFirstName": "John",
            "userLastName": "Doe",
            "userEmail": "john@example.com",
            "userPhoneNumber": "1234567890",
            "userProfile": "profile_data"
        }

        response = self.user_service.get_user_details_by_email("john@example.com")

        self.assertEqual(response.json["userID"], "user123")


if __name__ == '__main__':
    unittest.main()
