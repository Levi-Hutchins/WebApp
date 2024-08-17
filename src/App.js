import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import SearchPage from "./Pages/SearchPage/SearchPage";
import TestPage from "./Pages/TestPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import LogInPage from "./Pages/LogInPage";
import UserAccountPage from "./Pages/UserAccountPage";

import video from "./assets/backgroundVideo.mp4";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <Route path="/LogIn" element={<LogInPage />} />
            <Route path="/UserAccount" element={<UserAccountPage />} />
          </Routes>
        </div>

        <p>Unit Test</p>
      </div>
    </div>
  );
}

export default App;
