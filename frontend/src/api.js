import axios from "axios";

const API_URL = "http://127.0.0.1:5000";

// ✅ Sign Up API Call
export const signupUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

// ✅ Login API Call
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    return { error: error.response.data.message };
  }
};

// ✅ Fetch Gesture Prediction
export const predictGesture = async (image) => {
  try {
    const response = await axios.post(`${API_URL}/predict`, { image });
    return response.data.gesture;
  } catch (error) {
    console.error("Error predicting gesture:", error);
    return "Unknown";
  }
};
