import logo from "../images/logo.jpg";

function Header() {
  return (
    <header>
      <div className="header">
        <img src={logo} alt="" />
        <div id="header-login-btn">Reset Password</div>
      </div>
    </header>
  );
}

export default Header;
