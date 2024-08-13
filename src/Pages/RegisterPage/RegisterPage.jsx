
import "./RegisterPage.css";
import { useState } from "react";
import SignUp from "../../Components/SignUp/SignUp";
import Alert from '@mui/material/Alert';



const RegisterPage = () => {
  const [successfulSubmission, setSuccessfulSubmission] = useState(false);

  

  return (
    <div>


   
         <div className="div-border">
          <SignUp/>
          </div>

        
        
      </div>
  );
};

export default RegisterPage;
