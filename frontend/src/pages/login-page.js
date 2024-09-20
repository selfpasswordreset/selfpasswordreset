import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextField from "../components/textfield";

function LoginPage() {
  const navigate = useNavigate();

  // hide/show password state
  const [showPassword, setShowPassword] = useState(false);

  // input state
  const [values, setValues] = useState({ email: "", password: "" });

  // input attributes for login fields

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "email",
      pattern: "^\\d{8}@students\\.atmc\\.edu\\.au$",
      errorMessage: "username should be valid",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: showPassword ? "text" : "password",
      placeholder: "password",
      errorMessage: "password cannot be empty",
      required: true,
    },
  ];

  // change input value
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // setValues(e.target.value);
  };

  // hide/show password
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="form-container">
      <form className="login-form">
        <div className="wrapper">
          <h1>Sign into your account</h1>
          {inputs.map((input) => (
            <TextField
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          {/* <TextField
            type={"text"}
            name={"username"}
            placeholder={"username or email"}
          />
          <TextField
            type={showPassword ? "text" : "password"}
            name={"password"}
            placeholder={"password"}
          /> */}
          <div className="showme-checkbox">
            <input
              type="checkbox"
              name="checkbox"
              value={showPassword}
              onClick={togglePasswordVisibility}
            />
            <p>show me</p>
          </div>
          <a href="/resetpassword">Forgot Password?</a>
          <div
            className="button"
            id="login-button"
            onClick={() => {
              navigate("verification");
            }}
          >
            <input type="submit" name="Login" value="Login" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
