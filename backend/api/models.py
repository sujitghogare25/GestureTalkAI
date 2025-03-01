from .config import users_collection  # ✅ FIXED: Use relative import
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def create_user(email, password):
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    users_collection.insert_one({"email": email, "password": hashed_password})

def find_user_by_email(email):
    return users_collection.find_one({"email": email})
