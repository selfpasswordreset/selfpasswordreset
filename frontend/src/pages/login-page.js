import React from "react";

function LoginPage() {
  return (
    <div className="form-container">
      <form>
        <div className="wrapper">
          {/* <label for="username">Username or email</label> */}
          <h1>Sign into your account</h1>
          <div className="textbox">
            <input
              type="text"
              name="username"
              placeholder="username or email"
            />
          </div>
          {/* <label for="password">Password</label> */}
          <div className="textbox">
            <input type="text" name="password" placeholder="password" />
          </div>
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
