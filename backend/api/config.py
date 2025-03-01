from pymongo import MongoClient

# MongoDB Connection
MONGO_URI = "mongodb+srv://user1234:XbdbZemtQEr9a1Jl@cluster0.ktwke.mongodb.net/"
client = MongoClient(MONGO_URI)
db = client["auth_db"]
users_collection = db["users"]

# Secret key for JWT
JWT_SECRET = "GestureTalkAI"
