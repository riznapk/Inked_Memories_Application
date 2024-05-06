import unittest
from unittest.mock import patch, MagicMock
from flask import jsonify
from backend.services.cart_service import CartService
from main import app
class TestCartService(unittest.TestCase):

    def setUp(self):
        self.cart_service = CartService()

        self.app = app.test_client()
        self.app_context = app.test_request_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_add_single_cart_item(self):
        # with self.app:
        # Mock the repository's add_cart_data method
        self.cart_service.repo.get_all_cart_data = MagicMock()
        self.cart_service.repo.get_all_cart_data.return_value = []
        self.cart_service.repo.add_cart_data = MagicMock()
        response = self.cart_service.add_single_cart_item({
            "message": "Hello",
            "scheduledDate": "09-09-2024",
            "orderType": "orderType",
            "designFont": "designFont",
            "designImageURI": "designImageURI",
            "cartID": "cartID",
            "address": "address",
            "userID": "userID",
            "designPrice": "designPrice",
            "isLetterIncluded": "isLetterIncluded",
            "letter": "letter"
        })
        print(response)
        res_json = response[0]
        data = res_json.get_data(as_text=True)

        self.cart_service.repo.add_cart_data.assert_called_once()
        self.assertEqual(response[1], 200)
        self.assertIn('success', data)  ,  self.assertIn('success', data)

    def test_add_single_cart_item(self):
        self.cart_service.repo.add_cart_data = MagicMock()
        response = self.cart_service.add_single_cart_item({
            "message": "Hello",
            "scheduledDate": "09-09-2024",
            "orderType": "orderType",
            "designFont": "designFont",
            "designImageURI": "designImageURI",
            "cartID": "cartID",
            "address": "address",
            "userID": "userID",
            "designPrice": "designPrice",
            "isLetterIncluded": True,
            "letter": "letter"
        })
        self.cart_service.repo.add_cart_data.assert_called_once()
        self.assertEqual(response[1], 200)
        self.assertIn('success', response[0].get_data(as_text=True))

    def test_get_all_cart_data(self):
        self.cart_service.repo.get_all_cart_data = MagicMock()
        self.cart_service.repo.get_all_cart_data.return_value = [
            {
                "message": "Hello",
                "scheduledDate": "09-09-2024",
                "orderType": "orderType",
                "designFont": "designFont",
                "designImageURI": "designImageURI",
                "cartID": "cartID",
                "address": "address",
                "userID": "userID",
                "designPrice": "designPrice",
                "isLetterIncluded": True,
                "letter": "letter"
            }
        ]
        response = self.cart_service.get_all_cart_data()
        self.assertEqual(len(response), 1)
        self.assertEqual(response[0]["message"], "Hello")

    def test_remove_single_cart_item(self):
        self.cart_service.repo.remove_cart_item = MagicMock()
        response = self.cart_service.remove_single_cart_item({"cartID": "cartID"})
        self.cart_service.repo.remove_cart_item.assert_called_once()
        self.assertIn('The product item is deleted!', response.get_data(as_text=True))

    def test_remove_all_cart_item(self):
        self.cart_service.repo.remove_all_cart_items = MagicMock()
        response = self.cart_service.remove_all_cart_item()
        self.cart_service.repo.remove_all_cart_items.assert_called_once()
        self.assertIn('All items have been deleted from the cart!', response.get_data(as_text=True))

    def test_get_cart_data_by_id(self):
        self.cart_service.repo.get_cart_data_by_user_id = MagicMock()
        self.cart_service.repo.get_cart_data_by_user_id.return_value = [
            {
                "message": "Hello",
                "scheduledDate": "09-09-2024",
                "orderType": "orderType",
                "designFont": "designFont",
                "designImageURI": "designImageURI",
                "cartID": "cartID",
                "address": "address",
                "userID": "userID",
                "designPrice": "designPrice",
                "isLetterIncluded": True,
                "letter": "letter"
            }
        ]
        response = self.cart_service.get_cart_data_by_id("userID")
        response_json = response[0].get_json()  # Get the JSON data from the response
        self.assertEqual(len(response_json), 1)
        self.assertEqual(response_json[0]["message"], "Hello")


if __name__ == '__main__':
    unittest.main()
