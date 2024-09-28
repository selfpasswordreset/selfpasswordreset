import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import TextField from "../components/textfield";

function LoginPage() {
  const navigate = useNavigate();

  // input state
  const [values, setValues] = useState({ email: "", password: "" });
  const handleLogin = (e) => {
    e.preventDefault();
    const email = values.email;
    window.location.href = `https://login.microsoftonline.com/d08b9f61-feef-4ff7-9994-db6c531274c5/oauth2/v2.0/authorize?client_id=a2824bf9-eb22-4d2f-a0d3-4c9f6a1fd089&response_type=code&redirect_uri=http://localhost:3000&response_mode=query&scope=openid profile email offline_access&prompt=login&login_hint=${encodeURIComponent(
      email
    )}`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);

    if (code) {
      axios
        .post("http://localhost:5001/api/auth/callback", { code })
        .then((response) => {
          const username = response.data.username;
          const accessToken = response.data.accessToken;
          const userId = response.data.id;
          const msToken = response.data.msToken;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("msToken", msToken);
          localStorage.setItem("userName", username);
          localStorage.setItem("userId", userId);
          navigate("/home", { state: { username: username } });
        })
        .catch((error) => {
          console.error("Error during token exchange:", error);
        });
    }
  }, [navigate]);

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
  ];

  // change input value
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <form className="login-form" onSubmit={handleLogin}>
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

          <Link to="/verification">Forgot Password?</Link>
          <div className="button" id="login-button">
            <input type="submit" name="Login" value="Login" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
