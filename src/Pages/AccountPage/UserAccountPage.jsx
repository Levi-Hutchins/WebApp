import React from "react";
import styles from "./UserAccountPage.module.css";
import UserDetailsTable from "../../Components/DynamicTables/UserDetailsTable";
import Avatar from '@mui/material/Avatar';

const UserAccountPage = () => {
  return (
    <div>
      <div className={styles["title"]}>
        <h1 className={styles["title-secondary"]}>HELLO</h1>
        <h1 className={styles["title-secondary"]}></h1>
      </div>{" "}
      <div className={styles["avatar-icon"]}>

      <Avatar sx={{ bgcolor: "#5e43f3", width:200, height: 200, fontSize: 50 }}>OP</Avatar>

      </div>

      <UserDetailsTable/>
    </div>
  );
};

export default UserAccountPage;
