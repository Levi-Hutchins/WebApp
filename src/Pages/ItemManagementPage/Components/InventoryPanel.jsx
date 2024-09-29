import React from "react";
import styles from '../Styles/InventoryPanel.module.css';

const InventoryPanel = () => {
  const inventoryItems = [
    { name: "product 1", quantity: 17 },
    { name: "product 2", quantity: 10 },
    { name: "product 3", quantity: 8 },
    { name: "product 4", quantity: 79 },
    { name: "product 1", quantity: 1 },
    { name: "product 2", quantity: 4 },
    { name: "product 3", quantity: 0 },
    { name: "product 4", quantity: 0 },
    { name: "product 1", quantity: 17 },
    { name: "product 2", quantity: 10 },
    { name: "product 3", quantity: 8 },
    { name: "product 4", quantity: 79 },
    { name: "product 1", quantity: 1 },
    { name: "product 2", quantity: 4 },
    { name: "product 3", quantity: 0 },
    { name: "product 4", quantity: 0 },
    
  ];

  return (
    <div className={styles["panel"]}>
      <div className={styles["inventory-content"]}>
        <h2 className={styles["inventory-title"]}>Inventory</h2>
        <div className={styles["inventory-header"]}>
          <span className={styles["header-item"]}>Item</span>
          <span className={styles["header-quantity"]}>Quantity</span>
        </div>
        {inventoryItems.map((item, index) => (
          <div key={index} className={styles["inventory-row"]}>
            <span className={styles["item-name"]}>{item.name}</span>
            <span className={styles["item-quantity"]}>{item.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryPanel;
