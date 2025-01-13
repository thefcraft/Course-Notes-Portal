from dotenv import load_dotenv
import os, subprocess

BASE_DIR = os.path.dirname(__file__)
getpath = lambda *path: os.path.join(BASE_DIR, *path)
load_dotenv(dotenv_path=getpath('.env'))

assert os.path.exists(getpath('backend', 'utils', 'firebase.mjs')), "Please add firebase-admin credentials, see the backend\\utils\\firebase.example.mjs"
assert os.path.exists(getpath('.env')), "Please add environment file"

if input("Do you want to compile the Frontend? (Y/n): ").lower() == 'y':
    print("Compiling Frontend...")
    subprocess.run('cd frontend && npm run build && cd .. && npm run dev', shell=True)
    
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
subprocess.run(command, shell=True)
print("Done.")