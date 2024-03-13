import { React, useState } from "react";
const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.msg);
        localStorage.setItem("Admintoken", responseData.token);
      } else {
        console.error("Error logging in:", responseData.msg);
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Admin;
