import React from "react";
import Header from "../components/header";

function AuthenticationPage() {
  return (
    <div className="account-verification">
      <div id="auth-page-title">
        <h3>Get back into your account</h3>
      </div>
      <p>
        Verfication step &gt; Choose your contact method we should use for
        verification
      </p>
      <div className="verification">
        <div className="verification-options">
          <ul>
            <li>Email by alternative email address</li>
            <li>Send Code via Phone</li>
            <li>Enter a code from My authenticator app</li>
          </ul>
        </div>
        <div className="vertical-line"></div>
        <div className="verification-code">
          <p>You will receive a code in your email address</p>
          <div id="btn-send">Send</div>
          <div id="code-input">
            <h3>Enter your code</h3>
            <input type="text" name="verfication-code" />
          </div>
        </div>
      </div>
      <div className="bttns">
        <div id="btn-back">
          <p>Back</p>
          <div id="btn-next">
            <p>Next</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
