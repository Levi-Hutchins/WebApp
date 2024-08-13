import { React, useState } from "react";
import "./SignUp.css";
import InputBox from "../InputBox/InputBox";
import PersonIcon from "@mui/icons-material/Person";
import CustomButton from "../Button/CustomButton";
import Alert from "@mui/material/Alert";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
let [errorMsg, setErrorMsg] = useState("");
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
      setErrorMsg += "Please enter your name\n";
    }

    if (!email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      validationErrors.email = true;
      setErrorMsg += "Please enter a valid email\n";
    }

    if (!password.trim() || password.length < 8) {
      validationErrors.password = true;
      setErrorMsg += "Please enter a password greater than 8 characters\n";
    }

    if (!address.trim()) {
      validationErrors.address = true;
      setErrorMsg += "Please enter a valid address\n";
    }

    if (
      !phoneNumber.trim() ||
      !/^(\+61|0)?[ ]?(\(?\d{2,4}\)?)[ ]?\d{3,4}[ ]?\d{3,4}$/.test(phoneNumber)
    ) {
      validationErrors.phoneNumber = true;
      setErrorMsg += "Please enter a phone number\n";
    }

    setErrors(validationErrors);
    if (setErrorMsg !== "") setBadSubmission(true);
    if (Object.keys(validationErrors).length === 0) {
      setSuccessfulSubmission(true);
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
