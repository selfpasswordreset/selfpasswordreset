import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/login-page";
import Header from "./components/header";
import AuthenticationPage from "./pages/authentication-page";
import CreateNewPasswordPage from "./pages/create-new-password-page";
import VerificationPage from "./pages/verification-page";

export default function App() {
  return (
    <div>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/authentication" element={<AuthenticationPage />} />
          <Route
            path="/create-new-password"
            element={<CreateNewPasswordPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
