import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BtnNavbar from "../../assets/images/BtnNavbar.png";
import CloseBtnNav from '../../assets/images/CloseBtnNavbar.png';
import logoWhite from "../../assets/images/logo-white.png";
import logoYellow from "../../assets/images/logo-yellow.png";
import AuthContext from "../../contexts/AuthContext";
import { logout } from '../../store/AccessTokenStore';
import Login from '../Login/Login';
import Register from '../Register/Register';
import './Navbar.css';
import { useEffect } from 'react';
import { getOneUser } from '../../services/Users.services';

export default function Navbar() {
  const [isOpened, setIsOpened] = useState(false);
  const [register, setRegister] = useState(false);
  const [login, setLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [isOwner, setIsOwner] = useState("");
  let location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

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

  useEffect(() => {
    if(currentUser) {
      const userToFind = currentUser.id;

      getOneUser(userToFind)
        .then((res) => {
          if (res.type === "tenant&owner") {
            setIsOwner(true);
          } else {
            setIsOwner(false);
          }
        })
        .catch((err) => navigate("/error"));
    }    
  });

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

      <div onClick={handleOnClick}>
        <img src={BtnNavbar} alt="img" className="sandwich-navbar" />
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
              {isOwner && (
                <Link
                  to={`/properties/created/${currentUser.id}`}
                  onClick={handleOnClick}
                >
                  My properties
                </Link>
              )}
              <Link onClick={userLogOut}>Logout</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}