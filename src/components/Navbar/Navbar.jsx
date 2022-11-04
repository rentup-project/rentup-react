import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BtnNavbar from "../../assets/images/BtnNavbar.png";
import BtnNavbarNot from "../../assets/images/BtnNavbarNot.png";
import CloseBtnNav from '../../assets/images/CloseBtnNavbar.png';
import logoWhite from "../../assets/images/logo-white.png";
import logoYellow from "../../assets/images/logo-yellow.png";
import NotificationIcon from "../../assets/images/notification.png";
import NotificationIconRing from "../../assets/images/notification-yellow.png";
import AuthContext from "../../contexts/AuthContext";
import { logout } from '../../store/AccessTokenStore';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './Navbar.css';
import socket from '../../helpers/socketHelper';

export default function Navbar() {
  const [isOpened, setIsOpened] = useState(false);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [navIcon, setNavIcon] = useState(BtnNavbar);
  const [bellNot, setBellNot] = useState(NotificationIcon);
  let location = useLocation();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if(currentUser) {
      socket.emit('newUser', currentUser);
      socket.on("not", () => {
        setNavIcon(BtnNavbarNot)
        setBellNot(NotificationIconRing);
      });
    }
  },[currentUser])

  const userLogOut = () => {
    logout();
  };

  const handleOnClick = () => {
    if (!isOpened) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  };

  const handleOnClickNotification = () => {
    setNavIcon(BtnNavbar);
    setBellNot(NotificationIcon);
    setIsOpened(false);
  }

  const handleChangeLogin = (emailMessage = "") => {
    if (!login) {
      setRegister(false);
      setLogin(true);
      setMessage(emailMessage);
    }
  };

  const handleChangeRegister = () => {
    if (!register) {
      setRegister(true);
      setLogin(false);
      setMessage("");
    }
  };

  return (
    <div className={location.pathname === "/" ? "Navbar" : "Navbar fixed"}>
      <div></div>
      <div>
        <Link to="/">
          <img
            src={location.pathname === "/" ? logoWhite : logoYellow}
            alt="rentup-logo"
            className="logo-navbar"
          />
        </Link>
      </div>

      <div>
        <img
          src={navIcon}
          alt="img"
          className="sandwich-navbar"
          onClick={handleOnClick}
        />
      </div>

      {isOpened && (
        <div className="side-navbar">
          <div className="header-side-navbar">
            <img
              src={CloseBtnNav}
              alt="btn-close"
              onClick={handleOnClick}
              className="close-navbar"
            />
            {!currentUser && (
              <>
                <p
                  className={`cursor-pointer ${login && "bold"}`}
                  onClick={handleChangeLogin}
                >
                  Login
                </p>
                <p
                  className={`cursor-pointer ${register && "bold"}`}
                  onClick={handleChangeRegister}
                >
                  Register
                </p>
              </>
            )}
          </div>

          <div>
            {!currentUser &&
              (login ? (
                <Login
                  handleChangeRegister={handleChangeRegister}
                  message={message}
                />
              ) : (
                <Register handleChangeLogin={handleChangeLogin} />
              ))}
          </div>

          {currentUser && (
            <div className="Navbar-auth">
              <Link to="/" onClick={handleOnClick}>
                Home
              </Link>
              <Link to="/notifications" onClick={handleOnClickNotification}>
                <img
                  src={bellNot}
                  alt="notification"
                  className="notification-navbar"
                />
                <span>Notifications</span>
              </Link>
              <Link to="/search" onClick={handleOnClick}>
                Search properties
              </Link>
              <Link
                to={`/account/favs/${currentUser.id}`}
                onClick={handleOnClick}
              >
                Favourite properties
              </Link>
              <Link to="/property/create" onClick={handleOnClick}>
                Post a property
              </Link>
              <Link to={"/my-area"} onClick={handleOnClick}>
                My Area
              </Link>
              <Link onClick={userLogOut}>Logout</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}