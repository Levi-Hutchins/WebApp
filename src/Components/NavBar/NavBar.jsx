import React from "react";
import "./NavBar.css";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="nav">
      <Link to="/" className="homepage">
        HOME
      </Link>

      <ul>
        <li>
          <Link to="/Search">FIND ITEM</Link>
        </li>
        <li>
          <Link to="/Test">TEST</Link>
        </li>

        <li className="register-button-container">
          <Button
            className="register-button"
            variant="contained"
            sx={{
            fontFamily: 'Andale Mono, monospace	',
              backgroundColor: "#5e43f3",
              "&:hover": {
                backgroundColor: "#4e3ac0", 
              },
            }}
          >
            Register
          </Button>
        </li>
        <li className="login-button-container">
          <Button
            className="login-button"
            variant="outlined"
            sx={{
                fontFamily: 'Andale Mono, monospace	',

                borderColor: '#5e43f3',
                color: 'white'

            }}
          >
            Log In
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
