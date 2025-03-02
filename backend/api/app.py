# from flask import Flask, request, jsonify
# import cv2
# import mediapipe as mp
# import numpy as np
# import pandas as pd
# import base64
# from flask_cors import CORS
# from flask_bcrypt import Bcrypt
# from flask_jwt_extended import JWTManager
# from scipy.spatial.distance import euclidean
# from .routes import auth_bp  # ✅ FIXED Import (Relative Import Removed)
# from .config import JWT_SECRET  # ✅ FIXED Import

# app = Flask(__name__)
# CORS(app)

# # ✅ Configure JWT Authentication
# app.config["JWT_SECRET_KEY"] = JWT_SECRET
# jwt = JWTManager(app)

# # ✅ Load the reference gestures
# CSV_PATH = r"C:\Users\91775\Desktop\GestureTalkAI\backend\models\refrence_gestures.csv"
# reference_df = pd.read_csv(CSV_PATH)

# # ✅ Load MediaPipe Hands Model
# mp_hands = mp.solutions.hands
# hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

# # ✅ Register Authentication Blueprint
# app.register_blueprint(auth_bp, url_prefix="/auth")

# # ✅ Gesture Recognition Route
# @app.route("/predict", methods=["POST"])
# def predict():
#     try:
#         data = request.json  # Get JSON data from request
#         base64_image = data["image"].split(",")[1]  # ✅ Remove 'data:image/jpeg;base64,' prefix

#         # ✅ Decode Base64 to bytes
#         image_bytes = base64.b64decode(base64_image)

#         # ✅ Convert bytes to NumPy array
#         np_arr = np.frombuffer(image_bytes, dtype=np.uint8)

#         # ✅ Decode NumPy array into OpenCV image
#         frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

#         # ✅ Convert to RGB for MediaPipe processing
#         rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         results = hands.process(rgb_frame)

#         predicted_gesture = "No Hand Detected"

#         if results.multi_hand_landmarks:
#             for hand_landmarks in results.multi_hand_landmarks:
#                 current_landmarks = np.array(
#                     [[lm.x, lm.y, lm.z] for lm in hand_landmarks.landmark], dtype=np.float32
#                 ).flatten()

#                 # ✅ Compare with reference gestures
#                 min_distance = float("inf")
#                 best_match = "Unknown"

#                 for _, row in reference_df.iterrows():
#                     reference_landmarks = np.array(row[:-1], dtype=np.float32)
#                     distance = euclidean(current_landmarks, reference_landmarks)

#                     if distance < min_distance:
#                         min_distance = distance
#                         best_match = row["label"]

#                 predicted_gesture = best_match

#         return jsonify({"gesture": predicted_gesture})

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

# # ✅ Run Flask App
# if __name__ == "__main__":
#     app.run(debug=True)

from flask import Flask, request, jsonify
import cv2
import mediapipe as mp
import numpy as np
import pandas as pd
import base64
import os
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from scipy.spatial.distance import euclidean
from routes import auth_bp  # ✅ Changed from ".routes" to "routes"
from config import JWT_SECRET  # ✅ Changed from ".config" to "config"

app = Flask(__name__)
CORS(app)

# ✅ Configure JWT Authentication
app.config["JWT_SECRET_KEY"] = JWT_SECRET
jwt = JWTManager(app)

# ✅ Get the absolute path of the current directory (`api`)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  

# ✅ Update CSV path to point to `api/models/refrence_gestures.csv`
CSV_PATH = os.path.join(BASE_DIR, "models", "refrence_gestures.csv")

# ✅ Load the reference gestures
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
        base64_image = data["image"].split(",")[1]  # ✅ Remove 'data:image/jpeg;base64,' prefix

        # ✅ Decode Base64 to bytes
        image_bytes = base64.b64decode(base64_image)

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
                    distance = euclidean(current_landmarks, reference_landmarks)

                    if distance < min_distance:
                        min_distance = distance
                        best_match = row["label"]

                predicted_gesture = best_match

        return jsonify({"gesture": predicted_gesture})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ✅ Handler function for Vercel deployment
def handler(event, context):
    return app(event, context)

# ✅ Run Flask App (Locally)
if __name__ == "__main__":
    app.run(debug=True)
