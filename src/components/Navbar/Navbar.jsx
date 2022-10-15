import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../store/AccessTokenStore';
import './Navbar.css';
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import CloseBtnNav from '../../assets/images/CloseBtnNavbar.png';
import BtnNavbar from "../../assets/images/BtnNavbar.png";
import logoBlack from "../../assets/images/logo-black.png"


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
    <div className="Navbar">
      <div></div>
      <div>
        <Link to="/"><img src={logoBlack} alt="rentup-logo" className='logo-navbar' /></Link>
      </div>
      <div onClick={handleOnClick}>
        <img src={BtnNavbar} alt="img" className='sandwich-navbar' />
      </div>
        <div className={`side-navbar ${isOpened ? 'opened' : 'closed'}`}>
          <div className='header-side-navbar'>
            <img src={CloseBtnNav} alt="btn-close" onClick={handleOnClick} className='close-navbar' />
            <button>Login</button>
            <button>Register</button>
          </div>
          <ul>
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
    </div>
  );
}