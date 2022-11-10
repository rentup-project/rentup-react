import moment from "moment";
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ghostImage from '../../assets/images/ghost-image.png';
import { getNotifications } from '../../services/Account.services';
import AuthContext from './../../contexts/AuthContext';
import './NotificationsScreen.css';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(currentUser) {
      getNotifications(currentUser.id)
      .then((res) => {
        if (res.length) {
          res.forEach((notification) => {
            if(notification.type === 'message') {
                notification.path = '/my-area/messages';
                notification.message = 'You received a new message.';
            } else if (notification.type === 'reservation') {
                notification.path = "/my-area/myRents";
                notification.message = 'One of your properties has been reserved.'
            } else if (notification.type === "billUploaded") {
                notification.path = "/my-area/myRents";
                notification.message = "You have a new bill to check.";
            } else if (notification.type === "billPaid") {
                notification.path = "/my-area/myRents";
                notification.message = "You received a new payment.";
            } else {
                notification.path = "/my-area/myRents";
                notification.message ="The owner uploaded the contract, now you can access your rent section.";
            }
          })
          setNotifications(res)
        }
      })
      .catch((err) => navigate("/error"))
    }
  }, [currentUser, navigate])

  return (
    <div className='notifications-screen'>
      {
        notifications.length === 0 ? 
          <div className='no-content-div'>
            <h4>You have no notifications.</h4>
            <img src={ghostImage} alt="ghost" />
          </div>
        :
        <>
          <h2>Notifications</h2>
          <div className="messages-container">
            {
              notifications.map((notification) => (                
                  <Link to={notification.path} key={notification.id}>
                    <div className="msg-container">
                      <p className='msg-p'>{notification.message}</p>
                      <p className='msg-time'>{moment(notification.createdAt).format('DD/MM/YY - hh:mm')}</p>
                    </div>
                  </Link>
              ))
            }
          </div>
        </>
      }
    </div>
  )
}
