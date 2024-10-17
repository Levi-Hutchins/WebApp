import React, { useState, useEffect } from "react";
import styles from '../Styles/InventoryPanel.module.css';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import { toast } from "react-toastify";
import useInventory from "../Hooks/useInventory";

const InventoryPanel = () => {
  // destructure the function from the hook
  const { getAllInventory } = useInventory(); 
  const [inventory, setInventory] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  // depending on the resouce type renders different icons
  const handleDisplayIcon = (iconType) => {
    if(iconType === "Hard copy book") return <AutoStoriesIcon fontSize="small"/>
    else return <SpatialAudioOffIcon fontSize="small"/>

  }

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getAllInventory(); 
        setInventory(data); 
        setLoading(false); 
      } catch (err) {
        setError("Failed to fetch inventory");
        setLoading(false);
      }
    };

    fetchInventory(); 
  }, [getAllInventory]);


  if (error) {
    toast.error("An error occured fetching inventory",{
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
                      {/*map through the items and render each item name with quantity
                      along with the respective icon*/ }

        {inventory && inventory.length > 0 ? (
          
          inventory.map((item, index) => (
            <div key={index} className={styles["inventory-row"]}>
              <span className={styles["item-name"]}>{item.Name}  {handleDisplayIcon(item.ItemType)}</span> 
              <span className={styles["item-quantity"]}>{item.Quantity}</span>
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
