import { React, useState } from "react";
import "./SignUp.css";
import InputBox from "../InputBox/InputBox";
import PersonIcon from "@mui/icons-material/Person";
import CustomButton from "../Button/CustomButton";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [errors, setErrors] = useState({});

  const handleNameChange = (event) => setFullName(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleAddressChange = (event) => setAddress(event.target.value);

  const handlePhoneNumChange = (event) => setPhoneNumber(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!fullName.trim()) validationErrors.fullName = true;

    if (!email.trim()) validationErrors.email = "Email is required";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
      validationErrors.email = "Enter a valid Email";

    if (!password.trim()) validationErrors.password = "Password is required";
    else if (password.length < 8)
      validationErrors.password = "Password must be at least 8 characters";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) alert("Form Submitted");
  };

  return (
    <div className="container">
      <div className="inputs">
        <div className="input">
          <InputBox
            displayValue="Full Name"
            handleChange={handleNameChange}
            errroLevel={errors.fullName}
          />
          {errors.fullName && <span>{errors.fullName}</span>}
        </div>
        <div className="input">
          <InputBox
            displayValue="Email Address"
            handleChange={handleEmailChange}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div className="input">
          <InputBox
            displayValue="Password"
            handleChange={handlePasswordChange}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div className="input">
          <InputBox displayValue="Address" handleChange={handleAddressChange} />
        </div>
        <div className="input">
          <InputBox
            displayValue="Phone Number"
            handleChange={handlePhoneNumChange}
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
  );
};

export default SignUp;
