import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import styles from '../Styles/UsersPanel.module.css';

const UsersPanel = () => {
  const users = [
    { id: 1, name: "Cus Tomer" },
    { id: 2, name: "Emp Loyee" },
    { id: 3, name: "Corey Silk" },
    { id: 4, name: "Levi Hutchins" },
    { id: 5, name: "User Five" },
    { id: 6, name: "User Six" },
    { id: 7, name: "User Seven" },
    { id: 8, name: "User Eight" }
  ];

  return (
    <div className={styles["panel"]}>
      <h2 className={styles["users-title"]}>Users</h2>
      <div className={styles["users-list"]}>
        {users.map(user => (
          <div key={user.id} className={styles["user-item"]}>
            <PersonIcon className={styles["user-icon"]} />
            <span className={styles["user-name"]}>{user.name}</span>
            <EditIcon className={styles["edit-icon"]} />
          </div>
        ))}
      </div>
      <Button className={styles["add-button"]}>Add new user</Button>
    </div>
  );
};

export default UsersPanel;
