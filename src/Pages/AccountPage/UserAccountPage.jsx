import React, { useEffect, useState } from "react";
import styles from "./Styles/UserAccountPage.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import CheckOutDetailsTable from "./Components/CheckOutDetailsTable";
import EmployeeDetailsTable from "./Components/EmployeeDetailsTable";
import OrdersTable from "./Components/OrdersTable";

const UserAccountPage = () => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [checkOutDetails, setCheckOutDetails] = useState({});

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("LogInData"));
    if (loggedInUser && loggedInUser.User === "Employee") {
      setIsEmployee(true);
    } else {
      setIsEmployee(false);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUser = JSON.parse(localStorage.getItem("LogInData"));

      const loadingToast = toast.loading("Loading user data...", {
        position: "bottom-right",
        autoClose: false,
        closeOnClick: false,
      });

      if (!loggedInUser || !loggedInUser.EmailAddress) {
        setTimeout(() => {
          toast.dismiss(loadingToast);
        }, 1000);
        return;
      }

      try {
        if (isEmployee) {
          const response = await axios.get(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/User/find-one",
            {
              headers: {
                "xc-token": process.env.REACT_APP_APIKEY,
              },
              params: {
                where: `(Email,eq,${loggedInUser.EmailAddress})`,
              },
            }
          );
          const userData = response.data;
          setUserDetails({
            Email: userData.Email,
            Name: userData.Name,
            UserName: userData.UserName,
          });
        } else {
          const patronResponse = await axios.get(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/Patrons/find-one",
            {
              headers: {
                "xc-token": process.env.REACT_APP_APIKEY,
              },
              params: {
                where: `(Email,eq,${loggedInUser.EmailAddress})`,
              },
            }
          );

          const patronData = patronResponse.data;
          setUserDetails({
            Email: patronData.Email,
            Name: patronData.Name,
          });

          const toResponse = await axios.get(
            "http://localhost:8080/api/v1/db/data/v1/inft3050/TO/find-one",
            {
              headers: {
                "xc-token": process.env.REACT_APP_APIKEY,
              },
              params: {
                where: `(PatronId,eq,${patronData.UserID})`,
              },
            }
          );
          const toData = toResponse.data;

          setCheckOutDetails({
            Email: toData.Email,
            CardNumber: toData.CardNumber,
            CardOwner: toData.CardOwner,
            PhoneNumber: toData.PhoneNumber,
            StreetAddress: toData.StreetAddress,
            ExpiryDate: toData.Expiry,
            CVV: toData.CVV,
          });
        }

        toast.dismiss(loadingToast);
      } catch (error) {
        toast.dismiss(loadingToast);
        toast.error("Error fetching user data", {
          position: "bottom-right",
        });
      }
    };

    fetchUserData();
  }, [isEmployee]);

  return (
    <div>
      {isEmployee ? (
        <></>
      ) : (
        <div className={styles["details-orders-container"]}>
          <div className={styles["customer-view"]}>
            <EmployeeDetailsTable
              userValues={userDetails}
              isEmployee={isEmployee}
            />
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
