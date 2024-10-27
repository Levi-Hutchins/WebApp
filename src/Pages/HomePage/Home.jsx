import React from "react";
import styles from "./Styles/Home.module.css";
import FloatingIconsComponent from "./Animation";

// Import the image
import TEG_Banner from "./TEG_Banner.png"; // Ensure this path is correct.

const Home = () => {
  return (
    <div className={styles["home-container"]}>
      {/* Top row with the title */}
      <div className={styles["title-row"]}>
        <h1 className={styles["home-title-secondary"]}>
          Welcome to The Entertainment Guild
        </h1>
      </div>

      {/* Second row: Image on the left, text & animation on the right */}
      <div className={styles["content-row"]}>
        <div className={styles["image-container"]}>
          <img 
            src={TEG_Banner} 
            alt="Top Banner" 
            className={styles["home-image"]} 
          />
        </div>

        <div className={styles["animation-container"]}>
          <h3 className={styles["home-info-text"]}>Check out our latest range below!</h3>
          <FloatingIconsComponent />
        </div>
      </div>

      {/* Footer info */}
      <div className={styles["home-info"]}>
        <h3 className={styles["home-info-text"]}>Built by Levi & Corey</h3>
      </div>
    </div>
  );
};

export default Home;
