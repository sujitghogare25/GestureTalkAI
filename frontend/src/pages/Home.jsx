import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  TorusKnot,
  Plane,
  Sphere,
  MeshDistortMaterial,
} from "@react-three/drei";

// ✅ Floating Torus Animation
const FloatingTorus = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <TorusKnot ref={meshRef} args={[2, 0.5, 100, 16]} position={[0, 0, -10]}>
      <MeshDistortMaterial
        color="#ff4081"
        emissive="#ff79a1"
        distort={0.4}
        speed={2}
      />
    </TorusKnot>
  );
};

// ✅ Floating Sphere Animation
const FloatingSphere = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 1.2) * 0.5;
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.2;
  });

  return (
    <Sphere args={[1.5, 64, 64]} ref={meshRef} position={[3, 2, -8]}>
      <MeshDistortMaterial
        color="#00e5ff"
        emissive="#00e5ff"
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

// ✅ Animated Grid Plane (Tech Vibes)
const FloatingGrid = () => {
  return (
    <Plane
      args={[15, 15, 32, 32]}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3, -5]}
    >
      <meshStandardMaterial color="#111" wireframe />
    </Plane>
  );
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/gesture"); 
    }
  }, [user, navigate]);

  return (
    <Box
      sx={{
        height: "100vh",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: { xs: "10px", md: "0px" }, // Ensures spacing on mobile
      }}
    >
      <Navbar />

      {/* ✅ 3D Animated Background */}
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
        camera={{ position: [0, 1, 7] }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 3]} />
        <FloatingGrid />
        <FloatingTorus />
        <FloatingSphere />
      </Canvas>

      {/* ✅ Main Content */}
      <Container
        sx={{
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          paddingX: { xs: "20px", md: "0px" },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textShadow: "3px 3px 20px rgba(255, 255, 255, 0.3)",
              fontSize: { xs: "2rem", md: "3rem" },
              marginTop:"50px" // Responsive font sizes
            }}
          >
            Welcome to GestureTalkAI
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#ddd",
              maxWidth: "700px",
              mx: "auto",
              mt: 2,
              fontSize: { xs: "1rem", md: "1.2rem" },
              paddingX: { xs: "10px", md: "0px" },
            }}
          >
            Experience AI-powered hand gesture recognition for real-time
            communication.
          </Typography>
        </motion.div>

        {/* ✅ Glassmorphism Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
            padding: "40px",
            maxWidth: "90%", // Ensures it resizes properly on all screens
            textAlign: "center",
            boxShadow: "0px 4px 25px rgba(0,0,0,0.3)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textShadow: "2px 2px 15px rgba(255, 255, 255, 0.3)",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            🚀 Start Your AI Journey with Gesture Recognition
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#ddd",
              mt: 2,
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            Sign up now and explore the future of AI-powered sign language
            recognition.
          </Typography>

          {/* ✅ Call-to-Action Button */}
          <Button
            variant="contained"
            sx={{
              mt: 4,
              background: "linear-gradient(45deg, #ff4081, #ff79a1)",
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              fontSize: { xs: "1rem", md: "1.2rem" },
              borderRadius: "30px",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #ff79a1, #ff4081)",
                boxShadow: "0px 0px 25px rgba(255,64,129,0.8)",
                transform: "scale(1.05)",
              },
            }}
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Home;
