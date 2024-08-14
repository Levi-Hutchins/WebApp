import { React, useState } from "react";
import "./SignUp.css";
import InputBox from "../InputBox/InputBox";
import PersonIcon from "@mui/icons-material/Person";
import CustomButton from "../Button/CustomButton";
import Alert from "@mui/material/Alert";

const SignUp = ({handleNavigation}) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errors, setErrors] = useState({});
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);
  const [badSubmission, setBadSubmission] = useState(false);

  const handleNameChange = (event) => setFullName(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleAddressChange = (event) => setAddress(event.target.value);

  const handlePhoneNumChange = (event) => setPhoneNumber(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!fullName.trim()) {
      validationErrors.fullName = true;
    }

    //eslint-disable-next-line
    if (!email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      validationErrors.email = true;
    }

    if (!password.trim() || password.length < 8) {
      validationErrors.password = true;
    }

    if (!address.trim()) {
      validationErrors.address = true;
    }

    if (!email.trim() || !/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      validationErrors.email = true;
    }
    console.log(phoneNumber)
    //eslint-disable-next-line
    if (
      !phoneNumber.trim() ||
      !/^(\+?\(61\)|\(\+?61\)|\+?61|\(0[1-9]\)|0[1-9]) ?-?[0-9]{7,9}$/
      .test(phoneNumber)
    ) {
      validationErrors.phoneNumber = true;
    }

    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSuccessfulSubmission(true);
      setBadSubmission(false);
      handleNavigation(true)
    } else {
      setSuccessfulSubmission(false);
      setBadSubmission(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="inputs">
          <div className="input">
            <InputBox
              displayValue="Full Name"
              handleChange={handleNameChange}
              errorLevel={errors.fullName}
            />
            {errors.fullName && <span>{errors.fullName}</span>}
          </div>
          <div className="input">
            <InputBox
              displayValue="Email Address"
              handleChange={handleEmailChange}
              errorLevel={errors.email}
            />
            {errors.email && <span>{errors.email}</span>}
          </div>
          <div className="input">
            <InputBox
              displayValue="Password"
              handleChange={handlePasswordChange}
              errorLevel={errors.password}
            />
            {errors.password && <span>{errors.password}</span>}
          </div>
          <div className="input">
            <InputBox
              displayValue="Address"
              handleChange={handleAddressChange}
              errorLevel={errors.address}
            />
          </div>
          <div className="input">
            <InputBox
              displayValue="Phone Number"
              handleChange={handlePhoneNumChange}
              errorLevel={errors.phoneNumber}
            />
          </div>
          <div className="submit-button">
            <CustomButton
              displayValue="Sign Up"
              onSubmit={handleSubmit}
              buttonIcon={<PersonIcon />}
            />
          </div>
        </div>
      </div>
      {successfulSubmission ? (
        <div className="success-banner show">
          <Alert variant="filled" severity="success">
            User Successfully Created !
          </Alert>
        </div>
      ) : (
        <div className="success-banner"></div>
      )}
      {badSubmission ? (
        <div className="success-banner show">
          <Alert variant="filled" severity="error">
            Please correct highlighted fields
          </Alert>
        </div>
      ) : (
        <div className="success-banner"></div>
      )}
    </>
  );
};

export default SignUp;
