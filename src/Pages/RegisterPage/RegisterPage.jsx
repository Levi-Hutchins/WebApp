import { Link } from "react-router-dom";
import styles from "./Styles/RegisterPage.module.css";

import SignUp from "./Components/SignUp";

const RegisterPage = () => {


  return (
    <div>
      <div className={styles["signup-title"]}>
        <h1 className={styles["signup-title-primary"]}>Register</h1>
        <h1 className={styles["signup-title-secondary"]}> Now </h1>
        <h1 className={styles["signup-title-secondary"]}>!</h1>
        <h2 className={styles["sub-title"]}>Already have an account ? {<Link className={styles["login-link"]} to={'/Login'}>Log In </Link>}</h2>
      </div>
      <div className={styles["div-border"]}>
        <SignUp />
      </div>

    
    </div>
  );
};

export default RegisterPage;
