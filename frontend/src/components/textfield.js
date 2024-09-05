import { useState } from "react";

const TextField = ({ type, name, placeholder, fontawesomeicon }) => {
  const [value, setValue] = useState("");
  return (
    <div className="textbox">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <p>
        {fontawesomeicon}
        {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
        {/* <FontAwesomeIcon icon={faEye} /> */}
      </p>
    </div>
  );
};

export default TextField;
