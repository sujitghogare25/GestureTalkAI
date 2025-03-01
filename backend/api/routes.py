from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from .models import create_user, find_user_by_email  # ✅ FIXED Import
from flask_bcrypt import Bcrypt
import datetime

bcrypt = Bcrypt()
auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if find_user_by_email(email):
        return jsonify({"message": "User already exists"}), 400

    create_user(email, password)
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = find_user_by_email(email)
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(identity=email, expires_delta=datetime.timedelta(days=1))
    return jsonify({"access_token": access_token}), 200

@auth_bp.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({"message": f"Hello, {current_user}!"}), 200
