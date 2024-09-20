import { useState } from "react";
import { Link } from "react-router-dom";

function AuthenticationPage() {
  const [viaLink, setViaLink] = useState({
    type: "email",
    data: "",
  });

  const handleClick = (type) => {
    setViaLink({ ...viaLink, [viaLink[type]]: type });
  };

  console.log(viaLink);
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
              <Link onClick={() => handleClick("email")}>
                Send code via email address
              </Link>
            </li>
            <li>
              {" "}
              <Link onClick={() => handleClick("email")}>
                Enter a code from My authenticator app
              </Link>
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
        <Link id="back" className="btn" to={"/verification"}>
          Back
        </Link>
        <Link id="next" className="btn" to={"/create-new-password"}>
          Next
        </Link>
      </div>
    </div>
  );
}

export default AuthenticationPage;
