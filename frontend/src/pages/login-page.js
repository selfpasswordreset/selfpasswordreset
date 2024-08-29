import React from "react";
import TextField from "../components/textfield";

function LoginPage() {
  return (
    <div className="form-container">
      <form className="login-form">
        <div className="wrapper">
          {/* <label for="username">Username or email</label> */}
          <h1>Sign into your account</h1>
          <TextField name={"username"} placeholder={"username or email"} />

          {/* <label for="password">Password</label> */}
          <TextField name={"password"} placeholder={"password"} />

          <div className="showme-checkbox">
            <input type="checkbox" name="" value="" />
            <p>show me</p>
          </div>
          <a href="/resetpassword">Forgot Password?</a>
          <div className="button" id="login-button">
            <input type="submit" name="Login" value="Login" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
