import { useState } from "react";
import InputBox from "../../Components/InputBox/InputBox";
import "./RegisterPage.css";
import SignUp from "../../Components/SignUp/SignUp";


const RegisterPage = () => {
  return (
    <div>


      <div className="div-border">
        <SignUp />
      </div>
    </div>
  );
};

export default RegisterPage;
