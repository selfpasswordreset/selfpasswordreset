const TextField = ({ name, placeholder, fontawesomeicon }) => {
  return (
    <div className="textbox">
      <input type="text" name={name} placeholder={placeholder} value={""} />
      <p>
        {fontawesomeicon}
        {/* <FontAwesomeIcon icon={faEyeSlash} /> */}
        {/* <FontAwesomeIcon icon={faEye} /> */}
      </p>
    </div>
  );
};

export default TextField;
