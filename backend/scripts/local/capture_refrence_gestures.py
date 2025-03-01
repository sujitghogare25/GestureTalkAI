import cv2
import mediapipe as mp
import numpy as np
import pandas as pd

# ✅ Define 20 Custom Words
GESTURES = ["Hello", "Yes", "No", "Thank You", "Good", "Bad", "Stop", "Start", "Help", "Love",
            "Excuse Me", "Sorry", "Eat", "Drink", "Come Here", "Go Away", "Sit", "Stand", "Happy", "Sad"]

# ✅ Load MediaPipe Hands Model
mp_hands = mp.solutions.hands
hands = mp_hands.Hands(min_detection_confidence=0.7, min_tracking_confidence=0.7)

cap = cv2.VideoCapture(0)
dataset = []

for gesture in GESTURES:
    input(f"Press Enter to start recording '{gesture}' (5 seconds)...")
    print(f"Recording {gesture}...")

    for _ in range(50):  # Capture 50 samples per gesture
        ret, frame = cap.read()
        if not ret:
            continue

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = hands.process(rgb_frame)

        if results.multi_hand_landmarks:
            for hand_landmarks in results.multi_hand_landmarks:
                landmarks = []
                for lm in hand_landmarks.landmark:
                    landmarks.append(lm.x)
                    landmarks.append(lm.y)
                    landmarks.append(lm.z)

                dataset.append([*landmarks, gesture])

cap.release()

# ✅ Save Reference Gestures as CSV at the correct path
CSV_PATH = r"C:\Users\91775\Desktop\GestureTalkAI\GestureTalk\models\refrence_gestures.csv"
df = pd.DataFrame(dataset, columns=[f"point_{i}" for i in range(63)] + ["label"])
df.to_csv(CSV_PATH, index=False)
print(f"✅ Reference gestures saved successfully at: {CSV_PATH}")
