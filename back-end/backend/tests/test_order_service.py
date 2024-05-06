import unittest
from unittest.mock import MagicMock
from flask import jsonify
from backend.services.order_service import OrderService
from main import app

class TestOrderService(unittest.TestCase):

    def setUp(self):
        self.order_service = OrderService()

        self.app = app.test_client()
        self.app_context = app.test_request_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_add_order_data(self):
        self.order_service.repo.add_single_order = MagicMock()



        response = self.order_service.add_order_data({
            "amount": 100,
            "orderID": "order123",
            "cartItems": [],
            "userID": "user123",
            "orderPlacedDate": "2023-08-09",
            "status": "pending",
            "payment": "credit_card"
        })

        self.order_service.repo.add_single_order.assert_called_once()
        self.assertEqual(response[1], 200)
        self.assertIn('Order Placed!', response[0].get_data(as_text=True))

    def test_get_all_order_data(self):
        self.order_service.repo.get_all_orders = MagicMock()
        self.order_service.repo.get_all_orders.return_value = [
            {
                "orderID": "order123",
                "amount": 100,
                "cartItems": [],
                "orderPlacedDate": "2023-08-09",
                "status": "pending",
                "payment": "credit_card"
            }
        ]

        response = self.order_service.get_all_order_data()

        self.assertEqual(len(response.json), 1)
        self.assertEqual(response.json[0]["orderID"], "order123")

    def test_update_single_order(self):
        self.order_service.repo.update_single_order_by_id = MagicMock()

        response = self.order_service.update_single_order({
            "orderID": "order123",
            "status": "completed"
        })

        self.order_service.repo.update_single_order_by_id.assert_called_once()
        self.assertIn('order data with ID: order123 is updated!', response.get_data(as_text=True))

    def test_get_order_details_by_id(self):
        self.order_service.repo.get_all_orders_by_user_id = MagicMock()
        self.order_service.repo.get_all_orders_by_user_id.return_value = [
            {
                "orderID": "order123",
                "amount": 100,
                "cartItems": [],
                "orderPlacedDate": "2023-08-09",
                "status": "completed",
                "payment": "credit_card"
            }
        ]

        response = self.order_service.get_order_details_by_id("user123")

        response_json = response[0].get_json()
        self.assertEqual(len(response_json), 1)
        self.assertEqual(response_json[0]["orderID"], "order123")

if __name__ == '__main__':
    unittest.main()
