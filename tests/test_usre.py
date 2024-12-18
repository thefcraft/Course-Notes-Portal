import unittest
import requests 
from . import API
class TestAuth(unittest.TestCase):
    def test_get_me(self):
        req = {
            'email': 'test@example.com',
            'password': 'Password@123'
        }
        r = requests.post(f'{API}/api/auth/login', json=req)
        data = r.json()
        assert data['success']
        
        r = requests.get(f'{API}/api/users/me', cookies=r.cookies)
        data = r.json()
        assert data['success']
        assert data['user']['email'] == req['email']
        
    def test_put_me(self):
        req = {
            'email': 'test@example.com',
            'password': 'Password@123'
        }
        r = requests.post(f'{API}/api/auth/login', json=req)
        data = r.json()
        cookies = r.cookies
        assert data['success']
        
        
        r = requests.get(f'{API}/api/users/me', cookies=cookies)
        data = r.json()
        assert data['success']
        new_user_data = data['user']
        new_user_data['email'] = 'test@example2.com'
        
        r = requests.put(f'{API}/api/users/me', cookies=cookies, json=new_user_data)
        data = r.json()
        assert data['success']
        assert data['user']['email'] == 'test@example2.com'
        
        r = requests.get(f'{API}/api/users/me', cookies=cookies)
        data = r.json()
        assert data['success']
        assert data['user']['email'] == 'test@example2.com'
        
        new_user_data['email'] = req['email']
        
        req['email'] = 'test@example2.com'
        
        r = requests.post(f'{API}/api/auth/login', json=req)
        data = r.json()
        cookies = r.cookies
        assert data['success']
        
        req['email'] = new_user_data['email']
         
        r = requests.put(f'{API}/api/users/me', cookies=cookies, json=new_user_data)
        data = r.json()
        assert data['success']
        assert data['user']['email'] == req['email']
        
    def test_get_other(self):
        req = {
            'email': 'test@example.com',
            'password': 'Password@123'
        }
        r = requests.post(f'{API}/api/auth/login', json=req)
        data = r.json()
        cookies = r.cookies
        assert data['success']
        
        selfid = data['user']['_id']
        
        r = requests.get(f'{API}/api/users/{selfid}', cookies=cookies)
        data = r.json()
        assert data['success']
        assert data['user']['_id'] == selfid