import React from 'react';
import { useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import './AccountSection.css';
import { Link } from 'react-router-dom';

export default function Account() {
    const { currentUser } = useContext(AuthContext);

    return (
      currentUser && (
        <div id="account-container">
          <div className="user-info-header">
            <div
              className="user-img"
              style={{
                backgroundImage: `url(${currentUser.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
            <h3>{currentUser.name}</h3>
          </div>
          <hr></hr>
          <div className="user-data-wrapper">
            <div>
              Email:<span>{currentUser.email}</span>
            </div>
            <div>
              Phone number:
              <span>
                {currentUser.phoneNumber ? currentUser.phoneNumber : "-"}
              </span>
            </div>
            <div>
              Password:
              <span>●●●●●●●●</span>
            </div>
          </div>
          <Link>Edit</Link>
        </div>
      )
    );
}
