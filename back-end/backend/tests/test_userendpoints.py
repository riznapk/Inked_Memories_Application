import unittest
import json
from flask import Flask
from main import app


class TestUserEndPoints(unittest.TestCase):
    def setUp(self):
        self.app = app
        self.app.config['TESTING'] = True
        self.app = app.test_client()
        self.app.testing = True

        self.user_data = {
            "userID": "123",
            "userFirstName": "John",
            "userLastName": "Doe",
            "userEmail": "john.doe3@example.com",
            "userPassword": "Password@123",
            "userPhoneNumber": "07123456789",
            "userProfile": "admin"
        }

        self.headers = {
            'Content-Type': 'application/json',
            'Accept': '*'
        }

    def tearDown(self):
        pass

    # Test case to successful registration of users
    def test_users_post(self):
        response_post = self.app.post('/users', headers=self.headers, data=json.dumps(self.user_data))
        print(response_post.get_json())
        self.assertEqual(response_post.status_code, 200)
        response_data = response_post.get_json()
        self.assertEqual(response_data['status'], 'User Registered Successfully!')
        self.assertEqual(response_data['message'], 'success')

    # Test case to fetch all users data
    def test_users_get(self):
        response_get = self.app.get('/users', headers=self.headers)
        self.assertEqual(response_get.status_code, 200)
        response_data = response_get.get_json()
        self.assertIsInstance(response_data, list)
        self.assertTrue(len(response_data) > 0)


if __name__ == '__main__':
    unittest.main()
