import os
from pymongo import MongoClient
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv()

# ✅ MongoDB Connection (SECURED)
MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client["auth_db"]
users_collection = db["users"]

# ✅ Secret key for JWT
JWT_SECRET = os.getenv("JWT_SECRET")
