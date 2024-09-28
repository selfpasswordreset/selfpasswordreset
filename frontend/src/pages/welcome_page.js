import { useLocation, useNavigate } from "react-router-dom";

function WelcomePage() {
  const location = useLocation();
  const { username } = location.state || {};

  const navigate = useNavigate();

  const handleSignOut = () => {
    console.log("Sign out successful");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const handleResetPassword = () => {
    navigate("/create-new-password");
  };
  return (
    <div>
      <button type="button" onClick={handleSignOut}>
        Sign Out
      </button>
      <button type="button" onClick={handleResetPassword}>
        Reset Password
      </button>
      <h1>Hello, {localStorage.getItem("userName")} </h1>
    </div>
  );
}

export default WelcomePage;
