import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
const Admin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://ec2-3-91-241-28.compute-1.amazonaws.com:4000/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log(responseData.msg);
        localStorage.setItem('AdminToken',responseData.token);
        navigate('/adminpage')

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
