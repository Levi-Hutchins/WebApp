// UserAccountPage.js
import React, { useEffect, useState } from "react";
import AccountDetails from "./Components/AccountDetails";
import CheckoutDetails from "./Components/CheckoutDetails";
import { toast } from "react-toastify";
import styles from "./Styles/UserDashboard.module.css";
import Orders from "./Components/Orders";
import EmployeeAccountDetails from "./Components/EmployeeAccountDetails";

const UserAccountPage = () => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // when page loads read logged in  data and set appropriate level of access
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("LogInData"));
    setLoggedInUser(storedUser);
    setIsEmployee(
      storedUser?.User === "Employee" || storedUser?.User === "Admin"
    );
  }, []);

  // display loading message when data is being retrieved
  useEffect(() => {
    if (loading) {
      toast.loading("Loading data...", {
        position: "bottom-right",
        autoClose: false,
      });
    } else {
      toast.dismiss();
    }
  }, [loading]);

  return (
    <div className={styles["dashboard"]}>
      {/* depending on is the user logged in is an employee or not render the appropiate components*/}
      {isEmployee ? (
        <>
          <EmployeeAccountDetails
            loggedInUser={loggedInUser}
            setLoading={setLoading}
          />
        </>
      ) : (
        <>
          <AccountDetails loggedInUser={loggedInUser} setLoading={setLoading} />
          <CheckoutDetails
            loggedInUser={loggedInUser}
            setLoading={setLoading}
          />
          <Orders loggedInUser={loggedInUser} />
        </>
      )}
    </div>
  );
};

export default UserAccountPage;
