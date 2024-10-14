import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";

import TextField from "../components/textfield";

function ChangePasswordPage() {
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  const msToken = localStorage.getItem("msToken");

  // States to manage visibility toggling
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);
  const [showConfirmPasswordIcon, setShowConfirmPasswordIcon] = useState(false);

  // Toggle visibility for each password field
  const toggleNewPasswordVisibility = () => {
    setShowPasswordIcon((prevShowPasswordIcon) => !prevShowPasswordIcon);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPasswordIcon((prevShowConfirmPasswordIcon) => !prevShowConfirmPasswordIcon);
  };

  // Field states
  const [values, setValues] = useState({
    newpassword: "",
    confirmnewpassword: "",
  });

  const passwordRegPattern = `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`;

  // Input data for fields
  const inputs = [
    {
      id: 1,
      name: "newpassword",
      type: showPasswordIcon ? "text" : "password",
      errorMessage:
        "Password should include at least 1 letter, 1 number, and 1 special character",
    },
    {
      id: 2,
      name: "confirmnewpassword",
      type: showConfirmPasswordIcon ? "text" : "password",
      errorMessage: "The password did not match",
    },
  ];

  // Changes the value of the field as the user types
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Handle password reset function
  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (values.newpassword !== values.confirmnewpassword) {
      console.error("Passwords do not match");
      return; // Handle the error accordingly (show a message to the user)
    }

    try {
      const response = await axios.patch("http://localhost:5001/api/reset-password", {
        newPassword: values.newpassword,
        accessToken: accessToken,
        userId: userId,
        msToken: msToken,
      });
      console.log(response.data);
      // Redirect the user or show a success message here
    } catch (error) {
      console.error("Error resetting password:", error);
      // Handle the error accordingly (show a message to the user)
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <div className="new-password-form-container">
          <div className="page-title">
            <h3>Create New Password</h3>
          </div>
          <form className="new-password-form">
            {inputs.map((input) => (
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
                        : toggleConfirmPasswordVisibility
                    }
                  />
                }
              />
            ))}

            <div className="btn-submit" onClick={handlePasswordReset}>
              <p>Submit</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
