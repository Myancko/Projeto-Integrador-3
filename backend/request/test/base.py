import sys
sys.path.append("..")

from fastapi.testclient import TestClient
from main import app

class Test_base_request:
    
    
    def setup():
        
        client = TestClient(app)
        
        signup = {
            "id_user": "32",
            "name": "test_user",
            "matricula": "",
            "email": "test_user@gmail.com",
            "password": "test_user",
            "number": "test_user",
            "role": "anon"
        }
        
        response = client.post("http://127.0.0.1:8000/account/add", json=signup)
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
        
        data = {
        'id_request': request_id,
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

        response_ = client.post("http://127.0.0.1:8000/request/add", params=data, files=files)
        response = client.get(f"http://127.0.0.1:8000/request/get/{request_id}")
        print('app>', request_id, response_.json())
        print(response.json(), '<><>')
        
        return 'ok'

    def teardown():
        
        client = TestClient(app)
        
        response = client.get("http://127.0.0.1:8000/account/list")
        
        try:
            user_id = response.json()[-1]['id_user']
        except:
            user_id = 0
        
        
        response = client.get("http://127.0.0.1:8000/request/list")
        
        try:
            request_id = response.json()[-1]['id_request']
        except:
            request_id = 0
        
        client = TestClient(app)
        client.delete(f"/account/delete/{user_id}")
        client.delete(f"/request/delete/{request_id}")
        