import { useState } from "react";
import TextField from "../components/textfield";
import "../css/verification-page.css";

const VerificationPage = () => {
  const [value, setValue] = useState("");
  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="textfield-container">
          <h3 className="highlight-title">Recover your account</h3>
          <p>
            To recover your account begin by entering your username and the
            character below
          </p>
          <TextField type={"text"} name={"username"} placeholder={"username"} />
          <p className="text-left">Example: user@123@microsoft.com</p>
          <div className="captcha-and-input">
            <div className="captcha">XYZ</div>
            <input
              type="text"
              name="captcha"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <p className="text-left">
            Enter the character in the picture or word in audio
          </p>
          <div className="btn-next-align-center">
            <div className="btn-next">Next</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
