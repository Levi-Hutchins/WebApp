import { Box, FormControl, FormGroup, TextField, Button } from "@mui/material";
import { useState } from "react";
import HandleLogin from "../../../Helpers/HandleLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// LoginPortal component - handles user login functionality
const LoginPortal = () => {

  // states for login input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // handles submission of the login form
  async function handleSubmit(event) {
    event.preventDefault(); //Prevent reloading of the page

    const token = await HandleLogin(username, password.trim());
    if (token) {
      // Authenticated successful
      const IsAdmin = localStorage.getItem("IsAdmin") === "true";
      // routes user to admin page if admin
      if (IsAdmin){
        navigate("/Admin");
      }
      // routes to account page if not admin
      else{
      navigate("/UserAccount");}
    } 
    else {
      // Authentication failed
      toast.error("Authentication failed. Please try again.", {
        position: "bottom-right",
      });
    }
  }

  // updates userName state
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // updates password state
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Toast notification for password reset
  const handleForgotPassword = () => {
    toast.success("Reset password sent to email", {
      position: "bottom-right", 
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#28293d",
          borderRadius: "8px",
          padding: "40px",
          width: "500px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", 
        }}
      >
        <h1 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
          Login
        </h1>

        <form method="post" onSubmit={handleSubmit} style={{ marginRight: "0px" }}>
          <FormControl sx={{ width: "100%" }}>
            <FormGroup sx={{ marginBottom: "15px" }}>
              <TextField
                id="username-field"
                label="Enter your e-mail"
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1c1c2b", 
                    color: "white", 
                    borderRadius: "5px",
                    "&:hover fieldset": {
                      borderColor: "#5e43f3", 
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5e43f3", 
                    },
                  },
                  input: {
                    color: "white", 
                  },
                  "& .MuiInputLabel-root": {
                    color: "#aaa", 
                  },
                }} />
            </FormGroup>

            <FormGroup sx={{ marginBottom: "15px" }}>
              <TextField
                id="password-field"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1c1c2b", 
                    color: "white",
                    borderRadius: "5px",
                    "&:hover fieldset": {
                      borderColor: "#5e43f3",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5e43f3",
                    },
                  },
                  input: {
                    color: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "#aaa",
                  },
                }}/>
            </FormGroup>
          </FormControl>

          <Box sx={{ marginTop: "10px" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "50%",
                padding: "12px",
                backgroundColor: "#6c63ff", 
                borderRadius: "5px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#5a54e0",
                },
              }}>
              Submit
            </Button>
          </Box>

          <Box sx={{ marginTop: "10px" }}>
            <Button
              type="button"
              variant="contained"
              onClick={handleForgotPassword}
              sx={{
                width: "50%",
                padding: "12px",
                backgroundColor: "#6c63ff",
                borderRadius: "5px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#5a54e0", 
                },
              }}>
              Forgot password
            </Button>
          </Box>
        </form>

      </Box>
    </Box>
  );
};

    export default LoginPortal;
