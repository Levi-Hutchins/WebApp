import { React } from "react";
import styles from "../Styles/SignUp.module.css";
import InputBox from "../../../shared-components/InputBox/InputBox";
import PersonIcon from "@mui/icons-material/Person";
import CustomButton from "../../../shared-components/Button/CustomButton";
import useForm from "../Hooks/SignUpHook";



const SignUp = () => {
  const initialValues = {
    Email: "",
    Name: "",
    Password: "",
    ConfirmPassword: "",
  };
  const { values, handleChange, handleSubmit } = useForm(
    initialValues,
  );

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["signup-inputs"]}>
  
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Email Address*"
              handleChange={handleChange}
              value={values.Email}
              name="Email"
            />
          </div>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Full Name*"
              handleChange={handleChange}
              value={values.Name}
              name="Name"
            />
          </div>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Password*"
              handleChange={handleChange}
              isPassword={true}
              value={values.Password}
              name="Password"
            />
          </div>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Confirm Password"
              handleChange={handleChange}
              isPassword={true}
              value={values.ConfirmPassword}
              name="ConfirmPassword"
            />
          </div>
   

          
          

          <div className={styles["submit-button"]}>
          <CustomButton
              displayValue="Sign Up"
              onClick={handleSubmit}
              buttonIcon={<PersonIcon />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
