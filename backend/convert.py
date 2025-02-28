import tensorflow as tf

model_path = r"C:\Users\91775\.cache\kagglehub\models\sayannath235\american-sign-language\tensorFlow2\american-sign-language\1"

# Load the model using TensorFlow 2.x
model = tf.keras.models.load_model(model_path)

# Save it as H5 format
model.save("models/model.h5")

print("Model converted and saved as models/model.h5 ✅")
