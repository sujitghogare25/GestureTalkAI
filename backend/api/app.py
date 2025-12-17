from flask import Flask, request, jsonify
import cv2
import mediapipe as mp
import numpy as np
import pandas as pd
import base64
import os
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from scipy.spatial.distance import euclidean
from .routes import auth_bp
from .extensions import bcrypt  # ✅ Fixed import
from .config import users_collection

app = Flask(__name__)
CORS(app)

# ✅ Configure JWT Authentication
app.config["JWT_SECRET_KEY"] = os.getenv("gesture_talk_ai", "gesture_talk_ai")  
jwt = JWTManager(app)
bcrypt.init_app(app)   

# ✅ Load the reference gestures safely
CSV_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "models/refrence_gestures.csv"))
reference_df = pd.read_csv(CSV_PATH)

# ✅ Load MediaPipe Hands Model
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# ✅ Register Authentication Blueprint
app.register_blueprint(auth_bp, url_prefix="/auth")

# ✅ Gesture Recognition Route
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Get JSON data from request

        # ✅ Validate Input
        if not data or "image" not in data:
            return jsonify({"error": "Invalid input data"}), 400

        # ✅ Decode Base64 Image
        try:
            base64_image = data["image"].split(",")[1]
            image_bytes = base64.b64decode(base64_image)
        except (IndexError, ValueError, base64.binascii.Error):
            return jsonify({"error": "Invalid image format"}), 400

        # ✅ Convert bytes to NumPy array
        np_arr = np.frombuffer(image_bytes, dtype=np.uint8)

        # ✅ Decode NumPy array into OpenCV image
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # ✅ Convert to RGB for MediaPipe processing
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        predicted_gesture = "No Hand Detected"

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                current_landmarks = np.array(
                    [[lm.x, lm.y, lm.z] for lm in hand_landmarks.landmark], dtype=np.float32
                ).flatten()

                # ✅ Compare with reference gestures
                min_distance = float("inf")
                best_match = "Unknown"

                for _, row in reference_df.iterrows():
                    reference_landmarks = np.array(row[:-1], dtype=np.float32)

                    # ✅ Validate shape before comparing
                    if current_landmarks.shape == reference_landmarks.shape:
                        distance = euclidean(current_landmarks, reference_landmarks)
                        if distance < min_distance:
                            min_distance = distance
                            best_match = row["label"]

                predicted_gesture = best_match

        return jsonify({"gesture": predicted_gesture})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
