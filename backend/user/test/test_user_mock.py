from fastapi import FastAPI
from fastapi.testclient import TestClient
from user.api import user
from .base import Test_base_user
from unittest.mock import patch
from unittest import TestCase, main
 
import random

app = FastAPI()

app.include_router(user.router)


client = TestClient(app)

@patch('user.test.test_user_api.test_get_user')
def test_get_user_with_mock(mock_get):
    """ Testa o get de users """
    mock_get.return_value.status_code = 200
    mock_get.return_value.json.return_value = {
        'matricula': '11111123',
        'password': 'some_password'
    }
    response = test_get_user()
    assert response.status_code == 200
    assert response.json()['matricula'] == '11111123'
    assert response.json()['password'] != "test_user"