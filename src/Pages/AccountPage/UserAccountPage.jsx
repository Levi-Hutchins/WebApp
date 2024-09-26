import React, { useEffect, useState } from "react";
import styles from "./Styles/UserAccountPage.module.css";
import CheckOutDetailsTable from "./Components/CheckOutDetailsTable";
import UserDetailsTable from "./Components/UserDetailsTable";
import OrdersTable from "./Components/OrdersTable";
import useCustomerDetails from "./Hooks/useCustomerDetails";
import useEmployeeDetails from "./Hooks/useEmployeeDetails";
 // TODO: hook up products table to backend
const UserAccountPage = () => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("LogInData"));
    if (storedUser && storedUser.User === "Employee") {
      setIsEmployee(true);
    } else {
      setIsEmployee(false);
    }
    setLoggedInUser(storedUser);
  }, []);

  const { userDetails: customerDetails, checkOutDetails } = useCustomerDetails(loggedInUser);
  const { userDetails: employeeDetails } = useEmployeeDetails(loggedInUser);

  return (
    <div>
      {isEmployee ? (
        <div>
          {/* Render employee details here if necessary */}
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
