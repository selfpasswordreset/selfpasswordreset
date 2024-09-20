// import { useNavigate } from "react-router-dom";

function Header() {
  // const navigate = useNavigate();.
  return (
    <header>
      <div className="header">
        <img src="app-logo.png" alt="" />
        {/* <div id="header-login-btn" onClick={() => {
          navigate()
        }}>Reset Password</div> */}
      </div>
    </header>
  );
}

export default Header;
