import { useState } from "react";

const TextField = ({
  id,
  onChange,
  errorMessage,
  fontawesomeicon,
  value,

  ...inputProps
}) => {
  // input focus state
  const [focus, setFocus] = useState(false);

  // handle focus
  const handleFocus = () => {
    setFocus(true);
  };

  return (
    <>
      <div className="textbox">
        <input
          {...inputProps}
          onChange={onChange}
          onBlur={handleFocus}
          focused={focus.toString()}
        />
        {<span className="error-message">{errorMessage}</span>}

        <p>{fontawesomeicon}</p>
      </div>
    </>
  );
};

export default TextField;
