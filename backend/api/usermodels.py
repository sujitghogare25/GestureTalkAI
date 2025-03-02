from .config import users_collection
from .extensions import bcrypt  # ✅ Import bcrypt from extensions.py

def create_user(email, password):
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({"email": email, "password": hashed_password})

def find_user_by_email(email):
    return users_collection.find_one({"email": email})
