// UserAccountPage.js
import React, { useEffect, useState } from "react";
import AccountDetails from "./Components/AccountDetails";
import CheckoutDetails from "./Components/CheckoutDetails";
import useCustomerDetails from "./Hooks/useCustomerDetails";
import { toast } from "react-toastify";
import styles from './Styles/UserDashboard.module.css';
import Orders from "./Components/Orders";

const UserAccountPage = () => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("LogInData"));
    setLoggedInUser(storedUser);
    setIsEmployee(storedUser?.User === "Employee");

  }, []);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading data...", { position: "bottom-right", autoClose: false });
    } else {
      toast.dismiss();
    }
  }, [loading]);

  return (
    <div className={styles["dashboard"]}>
      <AccountDetails loggedInUser={loggedInUser} setLoading={setLoading} />
      <CheckoutDetails loggedInUser={loggedInUser} setLoading={setLoading} />
      <Orders loggedInUser={loggedInUser}/>
    </div>
  );
};

export default UserAccountPage;
