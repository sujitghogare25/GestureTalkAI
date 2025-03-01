import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/AuthContext"; // ✅ Import Auth Context

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext); // ✅ Get user & logout function
  const navigate = useNavigate();

  // Toggle Mobile Menu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Logout Handler
  const handleLogout = () => {
    logout(); // ✅ Clears authentication state
    navigate("/"); // ✅ Redirects to home after logout
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        background: "rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(10px)",
        padding: "10px 20px",
      }}
    >
      <Toolbar>
        {/* ✅ Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            flexGrow: 1,
          }}
        >
          GestureTalkAI
        </Typography>

        {/* ✅ Desktop Menu */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button component={Link} to="/" sx={{ color: "#fff" }}>
            Home
          </Button>
          <Button component={Link} to="/about" sx={{ color: "#fff" }}>
            About
          </Button>
          {!user ? (
            <>
              <Button component={Link} to="/signup" sx={{ color: "#fff" }}>
                Sign Up
              </Button>
              <Button component={Link} to="/login" sx={{ color: "#fff" }}>
                Login
              </Button>
            </>
          ) : (
            <Button onClick={handleLogout} sx={{ color: "#ff4081" }}>
              Logout
            </Button>
          )}
        </Box>

        {/* ✅ Mobile Menu Icon */}
        <IconButton
          sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>

      {/* ✅ Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            background: "rgba(0, 0, 0, 0.9)",
            color: "#fff",
            width: 250,
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/about"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="About" />
          </ListItem>

          {!user ? (
            <>
              <ListItem
                button
                component={Link}
                to="/signup"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Sign Up" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/login"
                onClick={handleDrawerToggle}
              >
                <ListItemText primary="Login" />
              </ListItem>
            </>
          ) : (
            <ListItem button onClick={handleLogout}>
              <ListItemText primary="Logout" sx={{ color: "#ff4081" }} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
