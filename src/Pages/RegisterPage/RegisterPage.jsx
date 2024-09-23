import { Link, useNavigate } from "react-router-dom";
import styles from "./Styles/RegisterPage.module.css";

import SignUp from "./Components/SignUp";

const RegisterPage = () => {
  const navigate = useNavigate();


  const handleNavigateToAccPage = (value) => {
    if (value) {
      setTimeout(() => {
        navigate("/UserAccount");
      }, 2000);
    } 
  };

  return (
    <div>
      <div className={styles["signup-title"]}>
        <h1 className={styles["signup-title-primary"]}>SIGN</h1>
        <h1 className={styles["signup-title-secondary"]}> UP NOW</h1>
        <h1 className={styles["signup-title-primary"]}> !</h1>
        <h2 className={styles["sub-title"]}>Already have an account ? {<Link className={styles["login-link"]} to={'/Login'}>Log In </Link>}</h2>
      </div>
      <div className={styles["div-border"]}>
        <SignUp
          handleNavigation={handleNavigateToAccPage}
         
        />
      </div>

    
    </div>
  );
};

export default RegisterPage;
