import unittest
from main import app
import json


class TestSignInAPI(unittest.TestCase):

    def setUp(self):
        self.app = app
        self.app.config['TESTING'] = True
        self.app = app.test_client()
        self.app.testing = True

        # set up some test data
        user_data = {
            "userEmail": "pkrizna1429@gmail.com",
            "userPassword": "Rizna@3292"
        }

        self.headers = {
            'Content-Type': 'application/json',
            'Accept': '*'
        }

    def tearDown(self):
        pass

    # Test case to show successfull authentication
    def test_signin_success(self):
        user_data = {
            "userEmail": "pkrizna1429@gmail.com",
            "userPassword": "Rizna@3292"
        }
        response = self.app.post('/users/signin', headers=self.headers, data=json.dumps(user_data))
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data['status'], 'User authenticated successfully!')
        self.assertEqual(response_data['message'], 'success')

    # Test case to check invalid credentials
    def test_signin_invalid_credentials(self):
        user_data = {
            "userEmail": "pkrizna1429@gmail.com",
            "userPassword": "wrongpassword",
        }
        response = self.app.post('/users/signin', headers=self.headers, data=json.dumps(user_data))
        self.assertEqual(response.status_code, 401)
        response_data = response.get_json()
        self.assertEqual(response_data['status'], 'Invalid email or password!')
        self.assertEqual(response_data['message'], 'failure')

    # Test case of missing field scenario
    def test_signin_missing_fields(self):
        user_data = {
            "userEmail": "pkrizna1429@gmail.com",
            "userPassword": "",
        }
        response = self.app.post('/users/signin', headers=self.headers, data=json.dumps(user_data))
        self.assertEqual(response.status_code, 200)
        response_data = response.get_json()
        self.assertEqual(response_data['status'], 'Missing required fields!')
        self.assertEqual(response_data['message'], 'failure')


if __name__ == '__main__':
    unittest.main()
