import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import AccountForm from '../AccountForm/AccountForm';
import './AccountSection.css';

export default function Account() {
    const [edit, setEdit] = useState('');
    const { currentUser } = useContext(AuthContext);

    const handleOnClick = () => {
      setEdit(true)
    }

    return (
      currentUser && !edit ? (
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
          </div>
          <button onClick={handleOnClick}>Edit</button>
        </div>
      ) : (
        <div id="account-container">
          <AccountForm />
        </div>
        )
    );
}
