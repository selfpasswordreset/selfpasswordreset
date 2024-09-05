import React from "react";
import { useState } from "react";
import TextField from "../components/textfield";

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="form-container">
      <form className="login-form">
        <div className="wrapper">
          <h1>Sign into your account</h1>
          <TextField
            type={"text"}
            name={"username"}
            placeholder={"username or email"}
          />

          <TextField
            type={showPassword ? "text" : "password"}
            name={"password"}
            placeholder={"password"}
          />

          <div className="showme-checkbox">
            <input
              type="checkbox"
              name=""
              value=""
              onClick={togglePasswordVisibility}
            />
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
