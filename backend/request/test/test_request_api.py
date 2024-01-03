from fastapi import FastAPI
from fastapi.testclient import TestClient
from request.api import request
from .base import Test_base_request
import random
import json

app = FastAPI()

app.include_router(request.router)


client = TestClient(app)

def test_get_requests():
    """ Testa o list de requests """
    
    response = client.get("http://127.0.0.1:8000/request/list")
    assert response.status_code == 200
    
def test_get_request():
    """ Testa o get de requests """
    
    Test_base_request.setup()
    
    response = client.get("http://127.0.0.1:8000/request/list")
    
    try:
        request_id = response.json()[-1]['id_request']
    except:
        request_id = 0
    
    response = client.get(f"http://127.0.0.1:8000/request/get/{request_id+1}")
    
    print(response, response.json(), '<<<')
    assert response.status_code == 200 

    
    Test_base_request.teardown()
    
def test_post_request():
    """ Testa o post de request """
        
    Test_base_request.setup()
    
    response = client.get("http://127.0.0.1:8000/account/list")
        
    try:
        user_id = response.json()[-1]['id_user']
    except:
        user_id = 1

    data = {
    'id_request': 0,
    'owner': user_id,
    'color': True,
    'data': ':dasd',
    'reason': 'eu qr',
    'two_sided': True,
    'quantity': 10,
    'status' : 'going',
    'date': '2023-11-03'
}

    
    files = {
    'file': open('request/test/test_file/test.rtf', 'rb')
    }
     
    response = client.post("http://127.0.0.1:8000/request/add", params=data, files=files)
    
    response = client.get("http://127.0.0.1:8000/request/list")
        
    try:
        request_id = response.json()[-1]['id_request']
    except:
        request_id = 1
   
    assert response.status_code == 200
    response = client.get(f"http://127.0.0.1:8000/request/get/{request_id}")
    assert response.json()['id_request'] == request_id
    
    client.delete(f"/request/delete/{request_id}")
    
    Test_base_request.teardown()
    
def test_delete_request():
    """ Testa o delete de request """
    
    Test_base_request.setup()
    
    response = client.get("http://127.0.0.1:8000/request/list")
        
    try:
        request_id = response.json()[-1]['id_request']
    except:
        request_id = 1
    
    assert response.status_code == 200 
    assert response.json()[-1]['id_request'] == request_id 
    
    Test_base_request.teardown()
    
def test_update_request():
    
    Test_base_request.setup()
    
    response = client.get("http://127.0.0.1:8000/account/list")
        
    try:
        user_id = response.json()[-1]['id_user']
    except:
        user_id = 1
        
    response = client.get("http://127.0.0.1:8000/request/list")
        
    try:
        request_id = response.json()[-1]['id_request']
    except:
        request_id = 1
    

    
    patch = {
    "id_request": request_id,
    "owner": 1,
    "color": True,
    "data": ":dasd",
    "reason": "eu qr s",
    "two_sided": True,
    "quantity": 10,
    "status": "going",
    "date": "2023-11-03"
}

    response = client.patch(f"http://127.0.0.1:8000/request/update/{request_id}", json=patch)
    print(response.json(), ' <<<<<<<<<<<')
    print(response.text , '<<<<<<<<<<<<')
    
    assert response.status_code == 201
    response = client.get(f"http://127.0.0.1:8000/request/get/{request_id}")
    assert response.json()['date'] == "2023-11-03"
    assert response.json()['status'] == 'going'
    
    client.delete(f"/request/delete/{id}")
    
    Test_base_request.teardown()