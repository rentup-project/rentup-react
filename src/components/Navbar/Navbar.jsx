import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../store/AccessTokenStore';
import './Navbar.css';
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import CloseBtnNav from '../../assets/images/CloseBtnNavbar.png';
import BtnNavbar from "../../assets/images/BtnNavbar.png";

export default function Navbar() {
  const [isOpened, setIsOpened] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const userLogOut = () => {
     logout()
  }

  const handleOnClick = () => {
    if(!isOpened) {
      setIsOpened(true)
    } else {
      setIsOpened(false);
    }    
  }
 
  return (
    <div>
      <div onClick={handleOnClick}>
        <img src={BtnNavbar} alt="img"/>
      </div>
      {isOpened && (
        <div className="Navbar">
          <img src={CloseBtnNav} alt="btn-close" onClick={handleOnClick} />
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!currentUser && (
              <>
                <li>
                  <Link to="/register">Register</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
            {currentUser && (
              <li>
                <Link onClick={userLogOut}>Logout</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}