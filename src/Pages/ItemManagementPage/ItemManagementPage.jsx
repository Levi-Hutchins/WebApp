import React from "react";
import UsersPanel from "./Components/UserPanel";
import ItemManagementPanel from "./Components/ItemManagementPanel";
import InventoryPanel from "./Components/InventoryPanel";
import styles from './Styles/AdminDashBoard.module.css';

const AdminDashboardPage = () => {
  return (
    <div className={styles["dashboard"]}>
      <UsersPanel />
      <ItemManagementPanel />
      <InventoryPanel />
    </div>
  );
};

export default AdminDashboardPage;
