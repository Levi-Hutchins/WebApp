import { Box, FormControl, FormGroup, TextField, Button } from "@mui/material";
import { useState } from "react";
import HandleLogin from "../../../Helpers/HandleLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const LoginPortal = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault(); //Prevent reloading of the page

    const token = await HandleLogin(username, password.trim());
    console.log("token: ", token);
    if (token) {
      console.log("Inside if token")
      // Authenticated successful
      const IsAdmin = localStorage.getItem("IsAdmin") === "true";
      if (IsAdmin){
        navigate("/Admin");
      }else{
      navigate("/UserAccount");}
    } else {
      // Authentication failed
      toast.error("Authentication failed. Please try again.", {
        position: "bottom-right",
      });
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

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
          backgroundColor: "#28293d", // Same form background color
          borderRadius: "8px",
          padding: "40px",
          width: "500px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Same box shadow
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
                    backgroundColor: "#1c1c2b", // Input background to match SignUp
                    color: "white", // Input text color
                    borderRadius: "5px",
                    "&:hover fieldset": {
                      borderColor: "#5e43f3", // Same hover color as SignUp
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#5e43f3", // Focus border color
                    },
                  },
                  input: {
                    color: "white", // Text color in the input
                  },
                  "& .MuiInputLabel-root": {
                    color: "#aaa", // Placeholder and label color
                  },
                }}
              />
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
                    backgroundColor: "#1c1c2b", // Same background as SignUp
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
                }}
              />
            </FormGroup>
          </FormControl>

          <Box sx={{ marginTop: "10px" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "50%",
                padding: "12px",
                backgroundColor: "#6c63ff", // Matching button color
                borderRadius: "5px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#5a54e0", // Hover effect to match
                },
              }}
            >
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
                backgroundColor: "#6c63ff", // Matching button color
                borderRadius: "5px",
                fontSize: "16px",
                "&:hover": {
                  backgroundColor: "#5a54e0", // Hover effect to match
                },
              }}
            >
              Forgot password
            </Button>
          </Box>
        </form>

      </Box>
    </Box>
  );
};

    export default LoginPortal;
