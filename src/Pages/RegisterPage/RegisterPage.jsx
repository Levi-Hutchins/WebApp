
import { useState } from "react";
import {useNavigate} from "react-router-dom";

import "./RegisterPage.css";
import SignUp from "../../Components/SignUp/SignUp";



const RegisterPage = () => {
  const [navigateToAccPage, setNavigateToAccPage] = useState(false);
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


   
         <div className="div-border">
          <SignUp handleNavigation={handleNavigateToAccPage}/>
          </div>

        
        
      </div>
  );
};

export default RegisterPage;
