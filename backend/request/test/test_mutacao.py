from fastapi import FastAPI
from fastapi.testclient import TestClient
from request.api import request
from .base import Test_base_request
import random
import json
import time

app = FastAPI()

app.include_router(request.router)

client = TestClient(app)

def test_get_requests():
    """ Mutation Test - Testa o list de requests """
    response = client.get("http://127.0.0.1:8000/request/list")
    assert response.status_code == 200  # Mutation: Changed assertion condition

def test_get_request():
    """ Mutation Test - Testa o get de requests """
    Test_base_request.setup()
    
    response = client.get("http://127.0.0.1:8000/request/list")
    
    # Mutation: Introduce delay before getting request_id
    time.sleep(1)
    
    try:
        request_id = response.json()[0]['id_request']  # Mutation: Modified index for request_id retrieval
    except:
        request_id = 0
    
    response = client.get(f"http://127.0.0.1:8000/request/get/{request_id+1}")
    print(response, response.json(), '<<<')
    assert response.status_code == 200  # Mutation: Changed expected status code
    
    Test_base_request.teardown()
    
def test_post_request():
    """ Mutation Test - Testa o post de request """
    Test_base_request.setup()
    
    response = client.get("http://127.0.0.1:8000/account/list")
    try:
        user_id = response.json()[0]['id_user']  # Mutation: Modified ID retrieval logic
    except:
        user_id = 1

    data = {
        'id_request': 0,
        'owner': user_id,
        'color': False,  # Mutation: Changed boolean value
        'data': ':dasd',
        'reason': 'eu qr',
        'two_sided': True,
        'quantity': -5,  # Mutation: Modified quantity to a negative value
        'status': 'going',
        'date': '2023-1111-03'  # Mutation: Changed date format
    }

    files = {
        'file': open('request/test/test_file/invalid_file.jpg', 'rb')  # Mutation: Incorrect file type
    }
    
    response = client.post("http://127.0.0.1:8000/request/add", params=data, files=files)
    response = client.get("http://127.0.0.1:8000/request/list")
    try:
        request_id = response.json()[0]['id_request']  # Mutation: Modified ID retrieval logic
    except:
        request_id = 1
    
    assert response.status_code != 200  # Mutation: Changed assertion condition
    response = client.get(f"http://127.0.0.1:8000/request/get/{request_id}")
    assert response.status_code == 404  # Mutation: Changed expected status code
    
    client.delete(f"/request/delete/{request_id}")
    
    Test_base_request.teardown()

def test_delete_request():
    """ Mutation Test - Testa o delete de request """
    Test_base_request.setup()
    
    response = client.get("http://127.0.0.1:8000/request/list")
    try:
        request_id = response.json()[0]['id_request']  # Mutation: Modified ID retrieval logic
    except:
        request_id = 1
    
    assert response.status_code == 200  # Mutation: Changed assertion condition
    assert response.json()[-1]['id_request'] == request_id  # Mutation: Changed assertion condition
    
    Test_base_request.teardown()

def test_update_request():
    """ Mutation Test - Testa o update de request """
    Test_base_request.setup()
    
    response = client.get("http://127.0.0.1:8000/account/list")
    try:
        user_id = response.json()[0]['id_user']  # Mutation: Modified ID retrieval logic
    except:
        user_id = 1
        
    response = client.get("http://127.0.0.1:8000/request/list")
    try:
        request_id = response.json()[0]['id_request']  # Mutation: Modified ID retrieval logic
    except:
        request_id = 1

    patch = {
        "id_request": request_id,
        "owner": 999,  # Mutation: Changed owner ID to an incorrect one
        "color": False,  # Mutation: Changed boolean value
        "data": ":modified_data",  # Mutation: Modified data value
        "reason": "eu qr s",
        "two_sided": True,
        "quantity": 7,  # Mutation: Modified quantity
        "status": "invalid_status",  # Mutation: Changed to an unsupported status
        "date": "2023-11-03"
    }

    response = client.patch(f"http://127.0.0.1:8000/request/update/{request_id}", json=patch)
    print(response.json(), ' <<<<<<<<<<<')
    print(response.text , '<<<<<<<<<<<<')
    
    assert response.status_code != 201  # Mutation: Changed assertion condition
    response = client.get(f"http://127.0.0.1:8000/request/get/{request_id}")
    assert response.json()['date'] != "2023-11-03"  # Mutation: Changed expected value
    assert response.json()['status'] != 'going'  # Mutation: Changed expected value
    
    client.delete(f"/request/delete/{id}")
    
    Test_base_request.teardown()

def test_malformed_endpoint():
    """ Mutation Test - Test a malformed endpoint """
    response = client.get("http://127.0.0.1:8000/request")
    assert response.status_code != 404  # Mutation: Check for expected 404 status code

def test_missing_field_post_request():
    """ Mutation Test - Test a post request with a missing field """
    data = {
        # Mutation: Remove a mandatory field
        'color': False,
        'data': ':dasd',
        'reason': 'eu qr',
        'two_sided': True,
        'quantity': 5,
        'status': 'going',
        'date': '2023-11-03'
    }
    response = client.post("http://127.0.0.1:8000/request/add", params=data)
    assert response.status_code == 201  # Mutation: Check for failure due to missing field

def test_file_size_exceed_limit():
    """ Mutation Test - Test a file size exceeding the limit """
    files = {
        # Mutation: Provide a file exceeding the server's upload limit
        'file': open('request/test/test_file/large_file.txt', 'rb')
    }
    response = client.post("http://127.0.0.1:8000/request/add", files=files)
    assert response.status_code == 201  # Mutation: Check for failure due to file size

def test_invalid_update_date():
    """ Mutation Test - Test an invalid date format in update request """
    response = client.get("http://127.0.0.1:8000/request/list")
    try:
        request_id = response.json()[0]['id_request']  # Mutation: Modified ID retrieval logic
    except:
        request_id = 1

    patch = {
        "id_request": request_id,
        "owner": 1,
        "color": False,
        "data": ":modified_data",
        "reason": "eu qr s",
        "two_sided": True,
        "quantity": 7,
        "status": "going",
        "date": "11-2023-00"  # Mutation: Changed date format to an incorrect one
    }

    response = client.patch(f"http://127.0.0.1:8000/request/update/{request_id}", json=patch)
    assert response.status_code == 201  # Mutation: Check for failure due to incorrect date format
