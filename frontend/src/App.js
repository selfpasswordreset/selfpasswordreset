import "./App.css";
import LoginPage from "./pages/login-page";
import Header from "./components/header";
import AuthenticationPage from "./pages/authentication-page";
import CreateNewPasswordPage from "./pages/create-new-password-page";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <AuthenticationPage /> */}
      {/* <LoginPage /> */}
      <CreateNewPasswordPage />
    </div>
  );
}

export default App;
