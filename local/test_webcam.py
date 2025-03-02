import cv2
import mediapipe as mp
import numpy as np
import pandas as pd
from scipy.spatial.distance import euclidean

# ✅ Set the correct path for your CSV file
CSV_PATH = r"C:\Users\91775\Desktop\GestureTalkAI\GestureTalk\models\refrence_gestures.csv"

# ✅ Load Reference Gestures
reference_df = pd.read_csv(CSV_PATH)

# ✅ Define 20 Custom Words
GESTURES = reference_df["label"].unique().tolist()

# ✅ Load MediaPipe Hands Model
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

cap = cv2.VideoCapture(0)

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Convert frame to RGB for MediaPipe
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    # Process the frame with MediaPipe
    results = hands.process(rgb_frame)

    predicted_gesture = "No Hand Detected"  # Default

    # ✅ Check if hands are detected
    if results.multi_hand_landmarks:
        for hand_landmarks in results.multi_hand_landmarks:
            # Extract current hand landmarks
            current_landmarks = np.array(
                [[lm.x, lm.y, lm.z] for lm in hand_landmarks.landmark],
                dtype=np.float32
            ).flatten()

            # ✅ Compare to reference gestures
            min_distance = float("inf")
            best_match = "Unknown"

            for _, row in reference_df.iterrows():
                reference_landmarks = np.array(row[:-1], dtype=np.float32)  # Exclude label column
                distance = euclidean(current_landmarks, reference_landmarks)

                if distance < min_distance:
                    min_distance = distance
                    best_match = row["label"]

            predicted_gesture = best_match

        # ✅ Display Predicted Gesture on Screen
        cv2.putText(frame, f"Gesture: {predicted_gesture}", (10, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    else:
        cv2.putText(frame, predicted_gesture, (10, 50),
                    cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 0, 255), 2)

    cv2.imshow("Hand Gesture Recognition", frame)

    # ✅ Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
