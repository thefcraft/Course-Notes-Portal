import unittest
import requests 
from . import API
class TestSign(unittest.TestCase):
        
    def test_signup(self):
        req = {
            'name': 'test',
            'password': 'Password@123',
            'email': 'test@example.com'
        }
        r = requests.post(f'{API}/api/auth/signup', json=req)
        data = r.json()
        if not data['success']:
            assert data['message'] == 'User already exists'
            return 
        code = data['user']['verificationToken']
        r = requests.post(f'{API}/api/auth/verify-email', json={
            'code': code,
            'email': req['email']
        })
        data = r.json()
        assert data['success']
        
    def test_login(self):
        req = {
            'email': 'test@example.com',
            'password': 'Password@123'
        }
        r = requests.post(f'{API}/api/auth/login', json=req)
        data = r.json()
        assert data['success']
        
        cookies = r.cookies
        
        r = requests.get(f'{API}/api/auth/check-auth', cookies=cookies)
        data = r.json()
        assert data['success']
        
    def test_reset(self):
        req = {
            'email': 'test@example.com',
            'password': 'Password@123'
        }
        r = requests.post(f'{API}/api/auth/forgot-password', json=req)
        data = r.json()
        assert data['success']
        r = requests.post(f'{API}/api/auth/reset-password/{data["resetToken"]}', json={
            'password': 'Password@1234'
        })
        data = r.json()
        assert data['success']
        
        req = {
            'email': 'test@example.com',
            'password': 'Password@1234'
        }
        r = requests.post(f'{API}/api/auth/forgot-password', json=req)
        data = r.json()
        assert data['success']
        r = requests.post(f'{API}/api/auth/reset-password/{data["resetToken"]}', json={
            'password': 'Password@123'
        })
        data = r.json()
        assert data['success']
        
    