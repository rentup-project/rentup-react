import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNotifications } from '../../services/Account.services';
import './NotificationsScreen.css';
import AuthContext from './../../contexts/AuthContext';
import moment from "moment";
import { Link } from 'react-router-dom';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([])
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser) {
      getNotifications(currentUser.id)
      .then((res) => {
        if (res.length) {
          res.forEach((notification) => {
            if(notification.type === 'message') {
              notification.message = 'You received a new message.'
            } else if (notification.type === 'reservation') {
              notification.message = 'One of your properties has been reserved.'
            } else {
              notification.message = 'You have a new bill.'
            }
          })
          setNotifications(res)
        }
      })
      .catch((err) => navigate("/error"))
    }
  }, [currentUser])

  return (
    <div className='notifications-screen'>
      {
        notifications === [] ? 
        <h2>You have no notifications</h2>
        :
        <>
          <h2>Notifications</h2>
          <div className="messages-container">
            {
              notifications.map((notification) => (
                <Link to='/my-area' key={notification.id}>
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
