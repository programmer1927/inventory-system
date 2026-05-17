import { useState } from "react";

import CoverPage from "./CoverPage.jsx";
import HomePage from "./HomePage.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

function App() {
  const [page, setPage] = useState(sessionStorage.getItem("token") ? "home" : "cover");
  const [token, setToken] = useState(sessionStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!sessionStorage.getItem("token"));

  const handleLogin = (tok) => {
    sessionStorage.setItem("token", tok);
    setToken(tok);
    setIsAuthenticated(true);
    setPage("home");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
    setPage("login");
  };

  return (
    <>
      {page === "cover" && (<CoverPage goToHome={() => setPage("login")}/>)}

      {page === "login" && (
        <Login goToSignup={() => setPage("signup")} onLogin={handleLogin}/>
      )}

      {page === "signup" && (
        <Signup goToLogin={() => setPage("login")} />
      )}

      {page === "home" && isAuthenticated && (
        <HomePage onLogout={handleLogout} token={token}/>
      )}
    </>
  );
}

export default App;
