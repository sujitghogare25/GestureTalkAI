import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About"; // ✅ Import About Page
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Gesture from "./pages/Gesture";
import StartPage from "./pages/StartPage";
import ProtectedRoute from "./components/ProtectedRoute"; // ✅ Import Protected Route
import Navbar from "./components/Navbar"; // ✅ Ensure Navbar is included
import WebcamCapture from "./components/WebCamCapture";

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Ensure Navbar is inside Router */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />{" "}
        {/* ✅ Fix: Add About Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* ✅ Protect Start & Gesture Pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="/start" element={<StartPage />} />
          <Route path="/gesture" element={<WebcamCapture />} />
        </Route>
        {/* ✅ Catch-All Route for 404 Page */}
        <Route
          path="*"
          element={
            <h1 style={{ color: "white", textAlign: "center" }}>
              404 - Page Not Found
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
