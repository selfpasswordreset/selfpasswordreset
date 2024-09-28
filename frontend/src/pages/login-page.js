import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PublicClientApplication } from "@azure/msal-browser";

import TextField from "../components/textfield";
import { msalConfig } from "../msalConfig";

const msalInstance = new PublicClientApplication(msalConfig);
msalInstance.initialize();

function LoginPage() {
  const navigate = useNavigate();

  // hide/show password state
  const [showPassword, setShowPassword] = useState(false);

  // input state
  const [values, setValues] = useState({ email: "", password: "" });
  const handleLogin = (e) => {
    e.preventDefault();
    // exit();
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
          console.log(
            "Access Token:",
            response.data.accessToken,
            "Username:",
            response.data.username,
            "userid",
            response.data.id
          );
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
  // useEffect(() => {
  //   const initializeMsal = async () => {
  //     try {
  //       await msalInstance.handleRedirectPromise();
  //     } catch (error) {
  //       console.error("Error during MSAL initialization:", error);
  //     }
  //   };

  //   initializeMsal();
  // }, []);

  // const handleAuthentication = async () => {
  //   try {
  //     const response = msalInstance.getAllAccounts();
  //     if (response.length > 0) {
  //       console.log("Login successful:", response[0]);
  //       // Optionally redirect to another page after successful login
  //       navigate("/create-new-password");
  //     }
  //   } catch (error) {
  //     console.error("Authentication error:", error);
  //   }
  // };

  // const handleLogin = async () => {
  //   const loginRequest = {
  //     scopes: ["User.Read"], //  read scope
  //   };

  //   try {
  //     await msalInstance.loginRedirect(loginRequest);
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:8000/api/login", {
  //       username: values.email,
  //     });
  //     console.log("Login successful:", response.data);
  //     // Redirect or do something with the response
  //   } catch (err) {
  //     console.log("Login failed. Please check your credentials.");
  //   }
  // };

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
    // {
    //   id: 2,
    //   name: "password",
    //   type: showPassword ? "text" : "password",
    //   placeholder: "password",
    //   errorMessage: "password cannot be empty",
    //   required: true,
    // },
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
          {/* <div className="showme-checkbox">
            <input
              type="checkbox"
              name="checkbox"
              value={showPassword}
              onClick={togglePasswordVisibility}
            />
            <p>show me</p>
          </div> */}
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
