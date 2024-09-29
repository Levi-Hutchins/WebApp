import { Box, FormControl, FormGroup, TextField, Button } from "@mui/material";
import { useState } from "react";
import HandleLogin from "../../Helpers/HandleLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault(); //Prevent reloading of the page

    const token = await HandleLogin(username, password);
    console.log("token: ", token);
    if (token) {
      console.log("Inside if token")
      // Authenticated successful
      setResult("Authentication successful");
      navigate("/UserAccount");
    } else {
      // Authentication failed
      setResult("Authentication failed");
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <Box display="flex" justifyContent="center">
      <Box
        width={300}
        alignItems="left"
        sx={{
          ".MuiTextField-root, .MuiFormControl-root": { m: 1, ml: 0 },
          ".MuiButton-root": { m: 1 },
        }}>

        <h1>Login</h1>
        
        <form method="post" onSubmit={handleSubmit}>
          <FormControl>
            <FormGroup>
              <TextField
                id="username-field"
                label="Username"
                variant="outlined"
                value={username}
                onChange={handleUsernameChange}
              />
            </FormGroup>
            <FormGroup>
              <TextField
                id="password-field"
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </FormGroup>
          </FormControl>
          <Box>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Box>
          <TextField
            id="result"
            disabled
            label="Authentication Result"
            value={result}
          />
        </form>
      </Box>
    </Box>
  );
};
export default Login;