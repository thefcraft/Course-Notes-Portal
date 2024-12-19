import unittest
import requests 
from . import API
class TestNote(unittest.TestCase):
    # This function is called before each test
    def setUp(self):
        req = {
            'email': 'test@example.com',
            'password': 'Password@123'
        }
        r = requests.post(f'{API}/api/auth/login', json=req)
        data = r.json()
        self.cookies = r.cookies
        assert data['success']
        
        r = requests.get(f'{API}/api/notes/', json={}, cookies=self.cookies) 
        data = r.json()
        assert data['success'], data['message']
        allnotes = data['notes']
        note = [note for note in allnotes if note['title'] == "test-note-temp"]
        if len(note) != 0:
            note = note[0]
            r = requests.delete(f'{API}/api/notes/{note["_id"]}', cookies=self.cookies) 
            assert  r.json()['success']
            
    # This function is called after each test
    def tearDown(self):
        ...
        
    def test_create(self):
        note = {
            "title": "test-note",
            "content": "...",
        }
        r = requests.post(f'{API}/api/notes/', json=note, cookies=self.cookies)
        data = r.json()
        if not data['success']:
            assert data['message'] == 'Note already exists'
        
        note = {
            "title": "test-note-1",
            "content": "note 1",
        }
        r = requests.post(f'{API}/api/notes/', json=note, cookies=self.cookies)
        data = r.json()
        if not data['success']:
            assert data['message'] == 'Note already exists'
        
    def test_get_all(self):
        r = requests.get(f'{API}/api/notes/', json={}, cookies=self.cookies) 
        data = r.json()
        assert data['success']
        allnotes = data['notes']
        
    def test_find_filter(self): ... # TODO: add filter logic
    
    def test_get(self):
        r = requests.get(f'{API}/api/notes/', json={}, cookies=self.cookies) 
        data = r.json()
        assert data['success']
        allnotes = data['notes']
        note = allnotes[0]
        r = requests.get(f'{API}/api/notes/{note["_id"]}', cookies=self.cookies) 
        data = r.json()
        assert data['success']
        assert data['note']['_id'] == note['_id']
        
    def test_delete(self):
        note = {
            "title": "test-note-temp",
            "content": "note temp",
        }
        r = requests.post(f'{API}/api/notes/', json=note, cookies=self.cookies)
        data = r.json()
        assert data['success'], data['message']
        
        r = requests.get(f'{API}/api/notes/', json={}, cookies=self.cookies) 
        data = r.json()
        assert data['success'], data['message']
        allnotes = data['notes']
        notes_len = len(allnotes)
        note = [note for note in allnotes if note['title'] == "test-note-temp"][0]
        
        
        r = requests.delete(f'{API}/api/notes/{note["_id"]}', cookies=self.cookies) 
        data = r.json()
        assert data['success'], data['message']
        
        r = requests.get(f'{API}/api/notes/', json={}, cookies=self.cookies) 
        data = r.json()
        assert data['success']
        allnotes = data['notes']
        assert notes_len == len(allnotes)+1
        
        r = requests.get(f'{API}/api/notes/{note["_id"]}', json={}, cookies=self.cookies) 
        data = r.json()
        assert data['message'] == 'Note not found'
        
    def test_update(self):
        note = {
            "title": "test-note-temp",
            "content": "note temp",
        }
        r = requests.post(f'{API}/api/notes/', json=note, cookies=self.cookies)
        data = r.json()
        assert data['success'], data['message']
        
        r = requests.get(f'{API}/api/notes/', json={}, cookies=self.cookies) 
        data = r.json()
        assert data['success'], data['message']
        allnotes = data['notes']
        note = [note for note in allnotes if note['title'] == "test-note-temp"][0]
        
        
        new_note = note
        new_note['content'] = 'new'
        
        r = requests.put(f'{API}/api/notes/{note["_id"]}', json=new_note, cookies=self.cookies) 
        data = r.json()
    
        assert data['success']
        
        
        r = requests.get(f'{API}/api/notes/{note["_id"]}', cookies=self.cookies) 
        data = r.json()
        assert data['note']['content'] == 'new'
        
        r = requests.delete(f'{API}/api/notes/{note["_id"]}', cookies=self.cookies) 
        assert  r.json()['success']
        
        
        