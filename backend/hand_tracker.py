import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.utils import img_to_array

# model_path = r"C:\Users\91775\Documents\FREELANCE\GestureTalkAI\backend\models\american-sign-language-model"


# Load the trained model
model = tf.keras.models.load_model("models/american-sign-language-model")

# Define class labels (Ensure this matches your model's output classes)
class_labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
                "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
                "U", "V", "W", "X", "Y", "Z"]

# Open the webcam
cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Preprocess the frame
    img = cv2.resize(frame, (224, 224))  # Resize to match model input
    img = img_to_array(img)
    img = np.expand_dims(img, axis=0)
    img = img / 255.0  # Normalize

    # Make prediction
    predictions = model.predict(img)
    predicted_class = np.argmax(predictions.flatten())  # Ensure correct indexing

    # Check for valid class index
    if 0 <= predicted_class < len(class_labels):
        predicted_label = class_labels[predicted_class]
    else:
        predicted_label = "Unknown"

    # Display result on the frame
    cv2.putText(frame, f"Prediction: {predicted_label}", (10, 50),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    cv2.imshow("Gesture Recognition", frame)

    # Press 'q' to exit
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
