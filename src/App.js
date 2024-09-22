import "./App.css";
import NavBar from "./shared-components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage/Home";
import SearchPage from "./pages/SearchPage/SearchPage";
import TestPage from "./pages/TestPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UserAccountPage from "./pages/AccountPage/UserAccountPage";
import ShoppingCartPage from "./pages/ShoppingCartPage/ShoppingCartPage";
import video from "./assets/backgroundVideo.mp4";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPortal from "./pages/LoginPage/components/LoginPortal";
function App() {
  const videoRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.9;
  });
  return (
    <div className="App">
            <div className="overlay">
              <NavBar />
              <video ref={videoRef} src={video} autoPlay loop muted />
              <ToastContainer autoClose={2000} />

              <div className="container">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Search" element={<SearchPage />} />
                  <Route path="/Test" element={<TestPage />} />
                  <Route path="/Register" element={<RegisterPage />} />
                  <Route path="/LogIn" element={<LoginPortal />} />
                  <Route path="/UserAccount" element={<UserAccountPage />} />
                  <Route path="/ShoppingCart" element={<ShoppingCartPage />} />
                </Routes>
              </div>

    </div>
    </div>

  );
}

export default App;
