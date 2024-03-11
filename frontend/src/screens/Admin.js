import { React, useState } from "react";
// import './Css/Admin.css'
const Admin = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email, Password }),
      });

      if (response.ok) {
        console.log("login successful!");
      } else {
        console.error("Error logging in:", response.statusText);
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login as admin</h1>
        <div className="loginsignup-fields">
          <input
            type="email"
            placeholder="Enter your E-mail"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Admin;
