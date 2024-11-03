// src/Utils/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ role }) => {
  const auth = () => {
    // get logged in user data
    const loggedInData = JSON.parse(localStorage.getItem("LogInData"));

    if (!loggedInData) return false;
    // depending on the required access determine if they can access
    if (role !== loggedInData.User) return false;
    if (role && loggedInData.User === role) {
      return true;
    }
    // if correct access navigate them to the desired page
    if (loggedInData.User === "Employee") {
      return <Navigate to="/Employee" />;
    } else if (loggedInData.User === "Admin") {
      return <Navigate to="/Admin" />;
    }

    return false;
    
  };
  // if their roles do not match navigate them to the log in page
  if (!auth()) return <Navigate to="/LogIn" />;
  // navigate them to the outlet page
  return <Outlet />;
};

export default PrivateRoute;
