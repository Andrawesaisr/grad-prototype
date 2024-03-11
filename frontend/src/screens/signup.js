import React, { useState } from "react";
// import { makeStyles } from "@material-ui/styles";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
import "../screens/Css/SignUp.css";
const Signup = () => {
  // const classes = useStyles();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        console.log("Signup successful!");
      } else {
        console.error("Error signing up:", response.statusText);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
    setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default Signup;