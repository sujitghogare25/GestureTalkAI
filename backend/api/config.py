import os
from pymongo import MongoClient
from dotenv import load_dotenv

# ✅ Load environment variables
load_dotenv()

# ✅ Secure MongoDB Connection
MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")  # Default to local MongoDB
client = MongoClient(MONGO_URL)

try:
    db = client["auth_db"]
    users_collection = db["users"]
    print("✅ Connected to MongoDB successfully!")
except Exception as e:
    print(f"❌ MongoDB Connection Error: {e}")
