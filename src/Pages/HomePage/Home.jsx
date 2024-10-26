import React from "react";
import styles from "./Styles/Home.module.css";

import FloatingIconsComponent from "./Animation"
const Home = () => {
  return (
    <div>
      <div className={styles["home-title"]}>
        <h1 className={styles["home-title-secondary"]}>WELCOME To The Entertainment
        Guild</h1>
      </div>

      <div className={styles["home-info"]}>
        <h3 className={styles["home-info-text"]}>Built by Levi & Corey</h3>
      </div>
      <div className={styles["home-animation"]}>
      <FloatingIconsComponent/>
      </div>
      <div className="shopping-icon">
      </div>
    </div>
  );
};

export default Home;
