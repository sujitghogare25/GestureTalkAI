# backend/predict.py
import tensorflow as tf
import numpy as np
import os

# Load model
model = tf.keras.models.load_model("models/model.h5")
print("Model Loaded Successfully!")

# Test with a random input (shape might differ)
dummy_input = np.random.rand(1, 21, 2)  # Example: 21 hand landmarks

# Predict
prediction = model.predict(dummy_input)
predicted_label = np.argmax(prediction)

print("Predicted Label:", predicted_label)
