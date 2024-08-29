import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import TextField from "../components/textfield";

// const encryptPassword = (password) => {
//   for (const i in password) {
//     console.log(i);
//   }
// };

const handleClick = () => {
  console.log("Working");
};

function CreateNewPasswordPage() {
  const [icon, setIcon] = useState(faEyeSlash);
  const [password, setPassword] = useState("");

  const changeIcon = () => {
    if (icon === faEyeSlash) {
      setIcon(faEye);
    } else {
      setIcon(faEyeSlash);
    }
  };

  // const encryptPassword = (password) {

  // }

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="new-password-form-container">
          <div className="page-title">
            <h3>Create New password</h3>
          </div>
          <form className="new-password-form">
            <TextField
              name={"new-password"}
              placeholder={"enter new password"}
              fontawesomeicon={
                <FontAwesomeIcon icon={icon} onClick={changeIcon} />
              }
            />
            <TextField
              name={"confirm-new-password"}
              placeholder={"confirm new password"}
              fontawesomeicon={
                <FontAwesomeIcon icon={icon} onClick={changeIcon} />
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
