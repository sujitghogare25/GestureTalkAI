import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          sx={{ color: "#fff", fontWeight: "bold", mb: 3 }}
        >
          Welcome to GestureTalkAI
        </Typography>
        <Typography variant="h6" sx={{ color: "#ddd", mb: 4 }}>
          Click below to start recognizing hand gestures in real-time.
        </Typography>
        <Button
          variant="contained"
          sx={{
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
          onClick={() => navigate("/gesture")}
        >
          Start GestureTalk
        </Button>
      </Container>
    </Box>
  );
};

export default StartPage;
