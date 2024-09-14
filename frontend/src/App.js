import "./App.css";
import React from "react";
import LoginPage from "./pages/login-page";
import Header from "./components/header";
import AuthenticationPage from "./pages/authentication-page";

function App() {
  return (
    <div className="App">
      <Header />
      <AuthenticationPage />
      {/* <LoginPage /> */}

    </div>
  );
}
export default App;
