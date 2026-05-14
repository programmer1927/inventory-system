import { useState } from "react";

function Signup({ goToLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {e.preventDefault();

    const user = {name,email,password,};

    localStorage.setItem("user", JSON.stringify(user));

    alert("Account Created Successfully");

    goToLogin();
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSignup}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required/>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required/>

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required/>

        <button type="submit">Sign Up</button>

        <p>
          Already have an account?
          <span onClick={goToLogin}> Login</span>
        </p>
      </form>
    </div>
  );
}

export default Signup;
