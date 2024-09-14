import logo from "../images/logo.jpg";
import React from 'react';

function Header() {
  return (
    <header>
      <div className="header">
        <img src={logo} alt="" />
        <div id="header-login-btn">Login</div>
      </div>
    </header>
  );
}

export default Header;
