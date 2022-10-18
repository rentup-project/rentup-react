import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../../store/AccessTokenStore';
import './Navbar.css';
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import CloseBtnNav from '../../assets/images/CloseBtnNavbar.png';
import BtnNavbar from "../../assets/images/BtnNavbar.png";
import logoYellow from "../../assets/images/logo-yellow.png";
import logoWhite from "../../assets/images/logo-white.png"
import Login from '../Login/Login';
import Register from '../Register/Register';


export default function Navbar() {
  const [isOpened, setIsOpened] = useState(false);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(true);
  const [message, setMessage] = useState('');
  let location = useLocation()

  const { currentUser } = useContext(AuthContext);

  const userLogOut = () => {
    logout()
  }

  const handleOnClick = () => {
    if (!isOpened) {
      setIsOpened(true)
    } else {
      setIsOpened(false);
    }
  }

  const handleChangeLogin = (emailMessage = '') => {
    if (!login) {
      setRegister(false)
      setLogin(true)
      setMessage(emailMessage)
    }
  }

  const handleChangeRegister = () => {
    if (!register) {
      setRegister(true)
      setLogin(false)
      setMessage('')
    }
  }

  return (
    <div className={location.pathname === '/' ? 'Navbar' : 'Navbar fixed'}>
      <div></div>
      <div>
        <Link to="/"><img src={location.pathname === '/' ? logoWhite : logoYellow} alt="rentup-logo" className='logo-navbar' /></Link>
      </div>
      <div onClick={handleOnClick}>
        <img src={BtnNavbar} alt="img" className='sandwich-navbar' />
      </div>
      {
        isOpened && (
          <div className='side-navbar'>
            <div className='header-side-navbar'>
              <img src={CloseBtnNav} alt="btn-close" onClick={handleOnClick} className='close-navbar' />
              {!currentUser && (
                <>
                <p className={`cursor-pointer ${login && 'bold'}`} onClick={handleChangeLogin}>Login</p>
                <p className={`cursor-pointer ${register && 'bold'}`} onClick={handleChangeRegister}>Register</p>
                </>
              )}
            </div>
            <div>
              {!currentUser && (
                login ? 
                <Login handleChangeRegister={handleChangeRegister} message={message} /> 
                : 
                <Register handleChangeLogin={handleChangeLogin} />
              )}
              {currentUser && (
                <Link onClick={userLogOut}>Logout</Link>
              )}
            </div>
          </div>
        )
      }
    </div>
  );
}