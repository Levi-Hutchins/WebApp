import React from "react";
import styles from "./Styles/UserAccountPage.module.css";
import UserDetailsTable from "./Components/UserDetailsTable";
import Avatar from '@mui/material/Avatar';

const UserAccountPage = () => {
  return (
    <div>
      <div className={styles["title"]}>
        {/* <h1 className={styles["title-secondary"]}>HELLO</h1>
        <h1 className={styles["title-secondary"]}>Username will go here</h1> */}
      </div>{" "}
      <div className={styles["avatar-icon"]}>

      <Avatar sx={{ bgcolor: "#5e43f3", width:200, height: 200, fontSize: 50 }}>JD</Avatar>

      </div>


      <div className={styles["details-table"]}>


      <UserDetailsTable/>

      </div>
    </div>
  );
};

export default UserAccountPage;
