from dotenv import load_dotenv
import os, subprocess
import threading
import json, time

BASE_DIR = os.path.dirname(__file__)
getpath = lambda *path: os.path.join(BASE_DIR, *path)
load_dotenv(dotenv_path=getpath('.env'))

assert os.path.exists(getpath('backend', 'utils', 'firebase.mjs')), "Please add firebase-admin credentials, see the backend\\utils\\firebase.example.mjs"
assert os.path.exists(getpath('.env')), "Please add environment file"

runBackend: bool = False
with open(getpath('vercel.example.json'), 'r') as f:
    vercel = json.load(f)

if input("Do you want to compile the Frontend? (Y/n): ").lower() == 'y':
    print("Compiling Frontend...")
    if input("skip? (Y/n): ").lower() != 'y':
        subprocess.run('cd frontend && npm run build && cd ..', shell=True)
    with open(getpath('vercel.json'), 'w') as f:
        json.dump(vercel, f, indent=2)
else: runBackend = True
if runBackend: 
    vercel['routes'] = [
        route if route['src'] != '/(.*)' 
              else  {
                        "src": "/(.*)",
                        "dest": "http://localhost:5173/$1"
                    } 
        for route in vercel['routes']
    ]
    with open(getpath('vercel.json'), 'w') as f:
        json.dump(vercel, f, indent=2)
    run_frontend = lambda: subprocess.run('cd frontend && npm run dev', shell=True)
    frontend_thread = threading.Thread(target=run_frontend)
    
print('Starting...')

# Setting the environment variables for Vercel dev
vercel_env = {
    'MONGODB_URI': os.environ['MONGODB_URI'],
    'NODE_ENV': os.environ['NODE_ENV'],
    'JWT_SECRET': os.environ['JWT_SECRET'],
    'CLOUDINARY_NAME': os.environ['CLOUDINARY_NAME'],
    'CLOUDINARY_API_KEY': os.environ['CLOUDINARY_API_KEY'],
    'CLOUDINARY_SECRET_KEY': os.environ['CLOUDINARY_SECRET_KEY']
}
command = ' && '.join([f'set {key}="{value}"' for key, value in vercel_env.items()])
command += ' && vercel dev'
print("Starting Vercel development server...")

if runBackend:
    run_backend = lambda: subprocess.run(command, shell=True)
    backend_thread = threading.Thread(target=run_backend)
    frontend_thread.start()
    backend_thread.start()
    frontend_thread.join()
    backend_thread.join()
else:
    subprocess.run(command, shell=True)
print("Done.")