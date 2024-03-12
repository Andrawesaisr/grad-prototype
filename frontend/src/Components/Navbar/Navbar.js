import React from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const HandleLogOut = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/user/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const responseData = await response.json();
      if (response.ok) {
        console.log("responseData", responseData.msg);
      } else {
        console.error("Error signing up:", responseData.msg);
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
    }
  };
  return (
    <div className="navbar">
      <div className="nav-logo">LOGO</div>
      <ul className="nav-menu">
        <li>
          <Link to="/sigup" style={{ textDecoration: "none" }}>
            Signup
          </Link>
        </li>
        <li>
          <Link to="/login" style={{ textDecoration: "none" }}>
            Login
          </Link>
        </li>
        <li>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            Admin
          </Link>
        </li>
        <li>about us</li>
      </ul>
      <div className="navbar-login">
        <button onClick={HandleLogOut}>signout</button>
      </div>
    </div>
  );
};

export default Navbar;
