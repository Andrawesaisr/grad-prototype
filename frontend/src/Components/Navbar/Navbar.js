import React from "react";
import "../Navbar/Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const HandleLogOut = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch("", {
        method: "",
        headers: {
          "Content-Type": "",
        },
        body: JSON.stringify(),
      });

    }catch(e){

    }

  }
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
        <button onClick={HandleLogOut} >Login</button>
      </div>
    </div>
  );
};

export default Navbar;
