import React from "react";
import Header from "../components/header";

function AuthenticationPage() {
  return (
    <div className="account-verification">
      <h1>Get back into your account</h1>
      <p>
        Verfication step Choose your contact method we should use for
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
        <div className="verification-code">
          <p>You will receive a code in email </p>
        </div>
      </div>
    </div>
  );
}

export default AuthenticationPage;
