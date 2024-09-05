import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import TextField from "../components/textfield";

function CreateNewPasswordPage() {
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowPasswordIcon((prevShowPasswordIcon) => !prevShowPasswordIcon);
  };

  const toogleConfirmPasswordVisibility = () => {
    setShowConfirmPasswordIcon(
      (prevShowConfirmPasswordIcon) => !prevShowConfirmPasswordIcon
    );
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="new-password-form-container">
          <div className="page-title">
            <h3>Create New password</h3>
          </div>
          <form className="new-password-form">
            <TextField
              type={showPasswordIcon ? "text" : "password"}
              name={"new-password"}
              placeholder={"enter new password"}
              fontawesomeicon={
                <FontAwesomeIcon
                  icon={showPasswordIcon ? faEye : faEyeSlash}
                  onClick={toggleNewPasswordVisibility}
                />
              }
            />
            <TextField
              type={showPasswordIcon ? "text" : "password"}
              name={"confirm-new-password"}
              placeholder={"confirm new password"}
              fontawesomeicon={
                <FontAwesomeIcon
                  icon={showConfirmPasswordIcon ? faEye : faEyeSlash}
                  onClick={toogleConfirmPasswordVisibility}
                />
              }
            />
            <p>
              Strong password required atleast 8 characters long included with{" "}
              uppercase and special characters.
            </p>
            <div className="btn-submit">
              <p>Submit</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPasswordPage;
