import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./RegisterPage.module.css";
import Alert from "@mui/material/Alert";

import SignUp from "../../Components/SignUp/SignUp";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  const [badSubmission, setBadSubmission] = useState(false);

  const handleNavigateToAccPage = (value) => {
    if (value) {
      setSuccessfulSubmission(true);
      setTimeout(() => {
        navigate("/UserAccount");
      }, 2000);
    } else {
      setBadSubmission(true);
    }
  };

  return (
    <div>
      <div className={styles["signup-title"]}>
        <h1 className={styles["signup-title-primary"]}>SIGN</h1>
        <h1 className={styles["signup-title-secondary"]}> UP NOW</h1>
        <h1 className={styles["signup-title-primary"]}> !</h1>
      </div>
      <div className={styles["div-border"]}>
        <SignUp
          handleNavigation={handleNavigateToAccPage}
          setSuccessfulSubmission={setSuccessfulSubmission}
          setBadSubmission={setBadSubmission}
        />
      </div>

      <div
        className={`${styles["success-banner"]} ${
          successfulSubmission ? styles.show : ""
        }`}
      >
        <Alert variant="filled" severity="success">
          User Successfully Created!
        </Alert>
      </div>

      <div
        className={`${styles["success-banner"]} ${
          badSubmission ? styles.show : ""
        }`}
      >
        <Alert variant="filled" severity="error">
          Please correct highlighted fields
        </Alert>
      </div>
    </div>
  );
};

export default RegisterPage;
