import unittest
from unittest.mock import MagicMock
from flask import Response, jsonify
from backend.services.design_service import DesignService
from main import app
class TestDesignService(unittest.TestCase):

    def setUp(self):
        self.design_service = DesignService()
        self.app = app.test_client()
        self.app_context = app.test_request_context()
        self.app_context.push()

    def tearDown(self):
        self.app_context.pop()

    def test_get_all_design_data(self):
        self.design_service.repo.get_all_designs = MagicMock()
        self.design_service.repo.get_all_designs.return_value = [
            {
                "designID": "123",
                "designName": "Design 1",
                "designDescription": "Description 1",
                "designPrice": 100,
                "designType": "Type A",
                "designImageURI": "image_uri_1"
            }
        ]

        response = self.design_service.get_all_design_data()

        self.assertEqual(len(response.json), 1)
        self.assertEqual(response.json[0]["designName"], "Design 1")

    def test_delete_single_design(self):
        self.design_service.repo.remove_single_design = MagicMock()
        response = self.design_service.delete_single_design({"designID": "123"})

        self.design_service.repo.remove_single_design.assert_called_once()
        self.assertIn('The design item is deleted!', response.get_data(as_text=True))

    def test_update_single_design_by_id(self):
        self.design_service.repo.update_single_design_by_id = MagicMock()
        response = self.design_service.update_single_design_by_id({
            "designID": "123",
            "designName": "Updated Design 1",
            "designDescription": "Updated Description 1",
            "designPrice": 150,
            "designType": "Type B",
            "designImageURI": "updated_image_uri"
        })

        self.design_service.repo.update_single_design_by_id.assert_called_once()
        self.assertIn('design data with ID: 123 is updated!', response.get_data(as_text=True))

if __name__ == '__main__':
    unittest.main()
