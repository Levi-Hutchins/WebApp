import React from "react";
import styles from "./Styles/Home.module.css";

const Home = () => {
  return (
    <div>
      <div className={styles["home-title"]}>
        <h1 className={styles["home-title-secondary"]}>WELCOME TO Entertainment
        Guild</h1>
      </div>

      <div className={styles["home-info"]}>
        <h3 className={styles["home-info-text"]}>To Corey's & Levi's INFT3050 Project.</h3>
      </div>

      <div className="shopping-icon">
      </div>
    </div>
  );
};

export default Home;
