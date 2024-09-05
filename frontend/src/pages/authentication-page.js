function AuthenticationPage() {
  return (
    <div className="account-verification">
      <div className="highlight-title">
        <h3>Get back into your account</h3>
      </div>
      <p>
        Verfication step &gt; Choose your contact method we should use for
        verification
      </p>
      <div className="verification">
        <div className="verification-options">
          <ul>
            <li>
              <a href="">Email by alternative email address</a>
            </li>
            <li>
              {" "}
              <a href="">Send Code via Phone</a>
            </li>
            <li>
              {" "}
              <a href="">Enter a code from My authenticator app</a>
            </li>
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
