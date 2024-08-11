import {React, useState} from "react";
import "./SignUp.css";
import InputBox from "../InputBox/InputBox";
import PersonIcon from '@mui/icons-material/Person';
import CustomButton from "../Button/CustomButton";
const SignUp = () => {





  return (
    
    <div className="container">
      <div className="inputs">
        <div ClassName="input">
          <InputBox displayValue="Full Name" />
        </div>
        <div ClassName="input">
          <InputBox displayValue="Email Address" />
        </div>
        <div ClassName="input">
          <InputBox displayValue="Password" />
        </div>
        <div ClassName="input">
          <InputBox displayValue="Address" />
        </div>
        <div ClassName="input">
          <InputBox displayValue="Phone Number" />
        </div>
        <div className="submit-button">
        <CustomButton displayValue="Sign Up" onSubmit={() => {}} buttonIcon={<PersonIcon/>}/>
        </div>
      </div>
    </div>

  );
};

export default SignUp;
