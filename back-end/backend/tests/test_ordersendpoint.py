import unittest
from main import app
import json

class TestOrderAPI(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()

    def test_place_order(self):
        data = {
            "amount": 100,
            "orderID": "12345",
            "cartItems": ["item1", "item2"],
            "userID": "user123",
            "orderPlacedDate": "2023-08-04",
            "status": "pending",
            "payment": "completed"
        }
        response = self.app.post('/orders', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {
            "amount": 100,
            "orderID": "12345",
            "cartItems": ["item1", "item2"],
            "userID": "user123",
            "orderPlacedDate": "2023-08-04",
            "status": "pending",
            "payment": "completed"
        })

    def test_get_all_orders(self):
        response = self.app.get('/orders')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(isinstance(data, list))

    def test_update_order_status(self):
        data = {
            "amount": 100,
            "orderID": "12345",
            "cartItems": ["item1", "item2"],
            "userID": "user123",
            "orderPlacedDate": "2023-08-04",
            "status": "pending",
            "payment": "completed"
        }
        response = self.app.put('/orders', json=data)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(json.loads(response.data), {
            'status': 'order data with ID: 12345 is updated!',
            'message': 'success'
        })

    def test_get_user_orders(self):
        user_id = "user123"
        response = self.app.get(f'/orders/{user_id}')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertTrue(isinstance(data, list))


if __name__ == '__main__':
    unittest.main()
