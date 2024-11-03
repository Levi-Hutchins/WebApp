import React, { useState, useEffect } from "react";
import styles from '../Styles/InventoryPanel.module.css';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import { toast } from "react-toastify";
import useInventory from "../Hooks/useInventory";

const InventoryPanel = () => {
  // extract getAllInventory function from the inventory hook
  const { getAllInventory } = useInventory(); 
  const [inventory, setInventory] = useState([]); 
  const [error, setError] = useState(null); 
  console.log(inventory)
  // determine icon based on item type
  const handleDisplayIcon = (iconType) => {
    if (iconType === "Hard copy book") return <AutoStoriesIcon fontSize="small" />;
    return <SpatialAudioOffIcon fontSize="small" />;
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        // fetch inventory data
        const data = await getAllInventory(); 
        setInventory(data); 
      } catch (err) {
        setError("Failed to fetch inventory");
      }
    };

    fetchInventory(); 
  }, [getAllInventory]);

  if (error) {
    toast.error("An error occurred fetching inventory", {
      position: "bottom-right"
    });
  }

  return (
    <div className={styles["panel"]}>
      <div className={styles["inventory-content"]}>
        <h2 className={styles["inventory-title"]}>Inventory</h2>
        <div className={styles["inventory-header"]}>
          <span className={styles["header-item"]}>Item</span>
          <span className={styles["header-quantity"]}>Quantity</span>
        </div>
        
        {/* map through inventory items, display name, quantity, and icon */}
        {inventory && inventory.length > 0 ? (
          inventory.map((item, index) => (
            
            <div key={index} className={styles["inventory-row"]}>
              <span className={styles["item-name"]}>
                {item.name} {handleDisplayIcon(item.itemType)}
              </span> 
              <span className={styles["item-quantity"]}>{item.quantity}</span>
            </div>
          ))
        ) : (
          <div>No inventory available</div> 
        )}
      </div>
    </div>
  );
};

export default InventoryPanel;
