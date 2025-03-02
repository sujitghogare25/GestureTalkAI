import cv2
import mediapipe as mp
import numpy as np

# Set the correct path for the model
MODEL_PATH = r"C:\Users\91775\Desktop\GestureTalkAI\GestureTalk\models\hand_landmarker.task"

# Load MediaPipe Hand Landmarker model
BaseOptions = mp.tasks.BaseOptions
HandLandmarker = mp.tasks.vision.HandLandmarker
HandLandmarkerOptions = mp.tasks.vision.HandLandmarkerOptions
VisionRunningMode = mp.tasks.vision.RunningMode

options = HandLandmarkerOptions(
    base_options=BaseOptions(model_asset_path=MODEL_PATH),
    running_mode=VisionRunningMode.IMAGE
)

hand_landmarker = HandLandmarker.create_from_options(options)

print("✅ MediaPipe model loaded successfully!")
