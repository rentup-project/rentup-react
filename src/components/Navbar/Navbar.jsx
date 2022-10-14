import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../store/AccessTokenStore';
import './Navbar.css';

export default function Navbar() {

  const userLogOut = () => {
     logout()
  }
 
  return (
    <div className="Navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link onClick={userLogOut}>Logout</Link>
        </li>
      </ul>
    </div>
  );
}
