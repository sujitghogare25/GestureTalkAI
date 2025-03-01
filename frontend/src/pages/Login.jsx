import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../api";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(email, password);
    if (response.error) {
      setError(response.error);
    } else {
      login(response.access_token);
      navigate("/start"); // Redirect after login
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ✅ Animated Flowing Lines in Background */}
      <motion.div
        animate={{
          background: [
            "radial-gradient(circle at 10% 20%, rgba(255, 64, 129, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(0, 229, 255, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 50%, rgba(255, 128, 0, 0.2) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      ></motion.div>

      <Container maxWidth="xs" sx={{ position: "relative", zIndex: 1 }}>
        {/* ✅ Glassmorphism Login Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            padding: "30px",
            textAlign: "center",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textShadow: "2px 2px 10px rgba(255,255,255,0.3)",
            }}
          >
            Login
          </Typography>

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              InputProps={{
                sx: {
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff4081",
                  },
                },
              }}
              InputLabelProps={{ sx: { color: "#ddd" } }}
            />

            {/* Password Field with Eye Icon */}
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                sx: {
                  color: "#fff",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff4081",
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      sx={{ color: "#fff" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{ sx: { color: "#ddd" } }}
            />

            {/* ✅ Login Button with Hover Effect */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                background: "linear-gradient(45deg, #ff4081, #ff79a1)",
                px: 4,
                py: 1.5,
                fontSize: "1.2rem",
                borderRadius: "30px",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "linear-gradient(45deg, #ff79a1, #ff4081)",
                  boxShadow: "0px 0px 20px rgba(255,64,129,0.8)",
                  transform: "scale(1.05)",
                },
              }}
            >
              Login
            </Button>
          </form>

          <Typography
            sx={{
              color: "#ddd",
              mt: 2,
              fontSize: "0.9rem",
              "& a": {
                color: "#ff79a1",
                textDecoration: "none",
                cursor: "pointer",
              },
              "& a:hover": { textDecoration: "underline" },
            }}
          >
            Don't have an account?{" "}
            <a onClick={() => navigate("/signup")}>Sign Up</a>
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Login;
