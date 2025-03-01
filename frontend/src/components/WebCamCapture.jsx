import React, { useRef, useEffect, useState } from "react";
import Webcam from "react-webcam";
import { predictGesture } from "../api";
import {
  Container,
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const [gesture, setGesture] = useState("Waiting for gesture...");

  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        if (imageSrc) {
          const predictedGesture = await predictGesture(imageSrc);
          setGesture(predictedGesture);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        gap: 4,
        mt: { xs: "70px", md: "100px" },
        px: { xs: 2, md: 4 },
      }}
    >
      {/* ✅ Left Side - Webcam */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          style={{
            width: "100%",
            maxWidth: "480px",
            aspectRatio: "4/3",
            borderRadius: "15px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        />
      </Box>

      {/* ✅ Right Side - Gesture Output & Instructions */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {/* ✅ Gesture Output */}
        <Paper
          elevation={3}
          sx={{
            padding: { xs: 3, md: 4 },
            textAlign: "center",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            borderRadius: "15px",
            boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
            maxWidth: "480px",
            width: "100%",
            minHeight: "180px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(255, 255, 255, 0.2)",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            Recognized Gesture:
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mt: 2,
              fontWeight: "bold",
              color: "#ff4081",
              textShadow: "0px 0px 8px rgba(255,64,129,0.8)",
              fontSize: { xs: "1.8rem", md: "2.5rem" },
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            {gesture}
          </Typography>
        </Paper>

        {/* ✅ Instructions */}
        <Paper
          elevation={2}
          sx={{
            padding: { xs: 2, md: 3 },
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "10px",
            maxWidth: "480px",
            width: "100%",
            boxShadow: "0px 3px 10px rgba(0,0,0,0.2)",
            textAlign: "left",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "black", mb: 1 }}
          >
            📌 Instructions:
          </Typography>
          <List sx={{ color: "black", fontSize: "1rem" }}>
            <ListItem>
              <ListItemText primary="✔️ Keep proper distance from the camera." />
            </ListItem>
            <ListItem>
              <ListItemText primary="✔️ This is based on hand gestures." />
            </ListItem>
            <ListItem>
              <ListItemText primary="✔️ You may experience slight latency." />
            </ListItem>
            <ListItem>
              <ListItemText primary="✔️ Perform gestures clearly for best recognition." />
            </ListItem>
          </List>
        </Paper>
      </Box>
    </Container>
  );
};

export default WebcamCapture;
