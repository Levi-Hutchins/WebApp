import React, { Component } from "react";
import "./Login.css"
import { Link } from "react-router-dom";


export default class Login extends Component {
    render() {
        return (
      <form className="login">
        <h3>Log In</h3>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>
        
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-centre">
          <a href="#">Forgot password?</a>
        </p>
        <p className="Sign-up text-right">
          <Link to="/Register" classname='ms-2'>Sign up</Link>
        </p>
      </form>
      );
    }
}