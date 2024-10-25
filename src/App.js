import "./App.css";
import NavBar from "./shared-components/NavBar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import SearchPage from "./Pages/SearchPage/SearchPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import UserAccountPage from "./Pages/AccountPage/UserAccountPage";
import ShoppingCartPage from "./Pages/ShoppingCartPage/ShoppingCartPage";
import video from "./assets/backgroundVideo.mp4";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogInPage from "./Pages/LoginPage/LogInPage";
import TestPage from "./Pages/TestPage/TestPage";
import AdminDashboardPage from "./Pages/ItemManagementPage/ItemManagementPage";

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
                  <Route path="/Register" element={<RegisterPage />} />
                  <Route path="/LogIn" element={<LogInPage />} />
                  <Route path="/Test" element={<TestPage />} />
                  <Route path="/Admin" element={<AdminDashboardPage />} />
                  <Route path="/UserAccount" element={<UserAccountPage />} />
                  <Route path="/ShoppingCart" element={<ShoppingCartPage />} />
                </Routes>
              </div>

    </div>
    </div>

  );
}

export default App;
