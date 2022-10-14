import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../store/AccessTokenStore';
import './Navbar.css';
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

export default function Navbar() {

  const { currentUser } = useContext(AuthContext);

  const userLogOut = () => {
     logout()
  }
 
  return (
    <div className="Navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {
          !currentUser &&
          <>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          </>
        }
        {
          currentUser &&
          <li>
            <Link onClick={userLogOut}>Logout</Link>
          </li>
        }
      </ul>
    </div>
  );
}
