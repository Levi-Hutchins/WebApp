import React, { useEffect, useState } from "react";
import styles from "./Styles/UserAccountPage.module.css";
import CheckOutDetailsTable from "./Components/CheckOutDetailsTable";
import UserDetailsTable from "./Components/UserDetailsTable";
import OrdersTable from "./Components/OrdersTable";
import useCustomerDetails from "./Hooks/useCustomerDetails";
import useEmployeeDetails from "./Hooks/useEmployeeDetails";
import { toast } from "react-toastify";

const UserAccountPage = () => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("LogInData"));
    if (storedUser && storedUser.User === "Employee") {
      setIsEmployee(true);
    } else {
      setIsEmployee(false);
    }
    setLoggedInUser(storedUser);
  }, []);

  useEffect(() => {
    if (loading) {
      toast.loading("Loading data...", { position: "bottom-right", autoClose: false });
    } else {
      toast.dismiss();
    }
  }, [loading]);

  const { userDetails: customerDetails, checkOutDetails } = useCustomerDetails(loggedInUser, setLoading);
  const { userDetails: employeeDetails } = useEmployeeDetails(loggedInUser, setLoading);

  return (
    <div>
      {isEmployee ? (
        <div>
          <UserDetailsTable userValues={employeeDetails} isEmployee={isEmployee} />
        </div>
      ) : (
        <div className={styles["details-orders-container"]}>
          <div className={styles["customer-view"]}>
            <UserDetailsTable userValues={customerDetails} isEmployee={isEmployee} />
            <div className="checkout-table">
              <CheckOutDetailsTable customerValues={checkOutDetails} />
            </div>
          </div>
          <div className={styles["orders-table"]}>
            <OrdersTable />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAccountPage;
