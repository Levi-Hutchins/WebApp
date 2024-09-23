import { React } from "react";
import styles from "../Styles/SignUp.module.css";
import InputBox from "../../../shared-components/InputBox/InputBox";
import PersonIcon from "@mui/icons-material/Person";
import CustomButton from "../../../shared-components/Button/CustomButton";
import { toast } from "react-toastify";
import useForm from "../Hooks/SignUpHook";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import signUpValidator from "../../../Utils/Validation/SignUpValidation";

const SignUp = ({ handleNavigation }) => {
  const initialValues = {
    userName: "",
    emailAddress: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    streetAddress: "",
    phoneNumber: "",
    adminStatus: false,
  };
  const { values, setValues, errors, handleChange, handleSubmit } = useForm(
    initialValues,
    signUpValidator,
    toast
  );
  const handleNumbersOnly = (e) => {
    if (!(/[0-9]/.test(e.key) || e.key === "Backspace" || e.key === "Delete")) {
      e.preventDefault();
      toast.warning("Please enter numbers only", {
        position: "bottom-right",
      });
    }
  };
  const handleChangeAdminStatus = (e) => {
    setValues({
      ...values,
      adminStatus: !values.adminStatus,
    });
  };

  return (
    <>
      <div className={styles["container"]}>
        <div className={styles["signup-inputs"]}>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="User Name*"
              handleChange={handleChange}
              errorLevel={!!errors.userName}
              value={values.userName}
              name="userName"
            />
          </div>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Email Address*"
              handleChange={handleChange}
              errorLevel={!!errors.emailAddress}
              value={values.emailAddress}
              name="emailAddress"
            />
          </div>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Full Name*"
              handleChange={handleChange}
              errorLevel={!!errors.fullName}
              value={values.fullName}
              name="fullName"
            />
          </div>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Password*"
              handleChange={handleChange}
              errorLevel={!!errors.password}
              isPassword={true}
              value={values.password}
              name="password"
            />
          </div>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Confirm Password"
              handleChange={handleChange}
              errorLevel={!!errors.confirmPassword}
              isPassword={true}
              value={values.confirmPassword}
              name="confirmPassword"
            />
          </div>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Street Address*"
              handleChange={handleChange}
              errorLevel={!!errors.streetAddress}
              value={values.streetAddress}
              name="streetAddress"
            />
          </div>
          <div className={styles["signup-input"]}>
            <InputBox
              displayValue="Phone Number*"
              handleChange={handleChange}
              onKeyPress={handleNumbersOnly}
              errorLevel={!!errors.phoneNumber}
              value={values.phoneNumber}
              name="phoneNumber"
            />
          </div>
          <div className={styles["signup-input"]}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "#5e43f3",
                    },
                  }}
                />
              }
              sx={{ color: "white" }}
              label="Would you like to be an Admin?"
              onChange={handleChangeAdminStatus}
              value={values.adminStatus}
              name="adminStatus"
            />
          </div>

          <div className={styles["signup-input"]}>
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
