import React from 'react'
import '../Navbar/Navbar.css'
import {Link} from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
            LOGO
        </div>
        <ul className='nav-menu'>
            <li>Signup</li>
            <li>Login</li>
            <li>Admin</li>
            <li>about us</li>
        </ul>
        <div className="navbar-login">
            <button>Login</button>
        </div>
    </div>
  )
}

export default Navbar