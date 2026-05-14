import { useState } from "react";

import CoverPage from "./CoverPage.jsx";
import HomePage from "./HomePage.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

function App() {
  const [page, setPage] = useState("cover");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setPage("home");
  };

  const handleLogout = () => {
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
        <HomePage onLogout={handleLogout} />
      )}
    </>
  );
}

export default App;
