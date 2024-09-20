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

  // field states
  const [values, setValues] = useState({
    newpassword: "",
    confirmnewpassword: "",
  });

  const passwordRegPattern = `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`;

  // input data for fields
  const inputs = [
    {
      id: 1,
      name: "newpassword",
      type: showPasswordIcon ? "text" : "password",
      placeholder: "enter new password",
      pattern: passwordRegPattern,
      errorMessage:
        "password should include at least 1 letter, 1 number and 1 special character",
    },
    {
      id: 2,
      name: "confirmnewpassword",
      type: showConfirmPasswordIcon ? "text" : "password",
      placeholder: "confirm new password",
      pattern: values.newpassword.toString(),
      errorMessage: "The password did not match",
    },
  ];

  // change value of the field as user types
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="new-password-form-container">
          <div className="page-title">
            <h3>Create New password</h3>
          </div>
          <form className="new-password-form">
            {inputs.map((input) => (
              // console.log();
              <TextField
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
                fontawesomeicon={
                  <FontAwesomeIcon
                    icon={
                      input.name === "newpassword"
                        ? showPasswordIcon
                          ? faEye
                          : faEyeSlash
                        : showConfirmPasswordIcon
                        ? faEye
                        : faEyeSlash
                    }
                    onClick={
                      input.name === "newpassword"
                        ? toggleNewPasswordVisibility
                        : toogleConfirmPasswordVisibility
                    }
                  />
                }
              />
            ))}

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
