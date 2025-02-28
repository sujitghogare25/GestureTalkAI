import os
import shutil

# Define the path where the model is downloaded
model_path = os.path.expanduser(r"~\.cache\kagglehub\models\sayannath235\american-sign-language\tensorFlow2\american-sign-language\1")

# Print the list of downloaded files
print("Files in model path:", os.listdir(model_path))

# Define the target path where you want to store the model
target_path = r"models/american-sign-language-model"

# Ensure the target directory exists
os.makedirs(target_path, exist_ok=True)

# Move the entire model directory
shutil.copytree(model_path, target_path, dirs_exist_ok=True)

print(f"Model successfully copied to {target_path}")
