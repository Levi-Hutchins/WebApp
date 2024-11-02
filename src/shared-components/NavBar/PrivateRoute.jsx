// src/Utils/PrivateRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ role }) => {
  const auth = () => {
    const loggedInData = JSON.parse(localStorage.getItem("LogInData"));

    if (!loggedInData) return false;

    if (role !== loggedInData.User) return false;
    if (role && loggedInData.User === role) {
      return true;
    }

    if (loggedInData.User === "Employee") {
      return <Navigate to="/Employee" />;
    } else if (loggedInData.User === "Admin") {
      return <Navigate to="/Admin" />;
    }

    return false;
  };

  if (!auth()) return <Navigate to="/LogIn" />;

  return <Outlet />;
};

export default PrivateRoute;
