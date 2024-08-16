import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div>
      <div className={styles["home-title"]}>
        <h1 className={styles["home-title-primary"]}>WELCOME</h1>
      </div>

      <div className={styles["home-info"]}>
        <h3 className={styles["home-info-text"]}>To Corey's & Levi's INFT3050</h3>
      </div>


    </div>
  );
};

export default Home;
