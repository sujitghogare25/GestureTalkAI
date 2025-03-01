import React, { useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Navbar from "../components/Navbar";

const aboutContent = [
  {
    title: "🌍 Easy Communication",
    description: "Translate gestures into text.",
  },
  {
    title: "⚡ AI-Powered",
    description: "Recognizes gestures quickly & accurately.",
  },
  { title: "📱 Works Everywhere", description: "Compatible with all devices." },
  {
    title: "🔒 Secure & Private",
    description: "Your data stays safe & encrypted.",
  },
  {
    title: "🎨 Simple & Modern",
    description: "Smooth & user-friendly experience.",
  },
  {
    title: "🚀 Future-Ready",
    description: "Always improving with AI updates.",
  },
];

// ✅ Animated Background Elements
const AnimatedBackground = () => {
  const floatingRef = useRef(null);

  useEffect(() => {
    let x = 0,
      y = 0,
      directionX = 1,
      directionY = 1;
    const animate = () => {
      if (floatingRef.current) {
        x += 0.5 * directionX;
        y += 0.3 * directionY;

        if (x > 50 || x < -50) directionX *= -1;
        if (y > 50 || y < -50) directionY *= -1;

        floatingRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <Box
      ref={floatingRef}
      sx={{
        position: "absolute",
        width: "300px",
        height: "300px",
        background: "rgba(255,64,129,0.5)",
        borderRadius: "50%",
        filter: "blur(120px)",
        top: "15%",
        left: "5%",
        zIndex: 0,
      }}
    />
  );
};

const About = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ✅ Static Navbar */}
      <Navbar />

      {/* ✅ Animated Floating Background */}
      <AnimatedBackground />

      <Container
        sx={{
          textAlign: "center",
          mt: 12,
          pb: 6,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontWeight: "bold",
            textShadow: "0px 4px 15px rgba(255,255,255,0.3)",
          }}
        >
          About GestureTalkAI
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#ddd", maxWidth: "750px", mx: "auto", mt: 2 }}
        >
          AI-powered hand gesture recognition for real-time communication.
        </Typography>

        {/* ✅ Info Cards */}
        <Grid container spacing={4} sx={{ mt: 6, justifyContent: "center" }}>
          {aboutContent.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(15px)",
                  borderRadius: "15px",
                  boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
                  color: "#fff",
                  textAlign: "center",
                  height: "180px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 6px 25px rgba(255,64,129,0.4)",
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{ fontWeight: "bold", color: "#ff4081" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ✅ Additional Floating Background Element */}
      <Box
        sx={{
          position: "absolute",
          width: "250px",
          height: "250px",
          background: "rgba(0,229,255,0.5)",
          borderRadius: "50%",
          filter: "blur(100px)",
          bottom: "10%",
          right: "10%",
          zIndex: 0,
        }}
      />
    </Box>
  );
};

export default About;
