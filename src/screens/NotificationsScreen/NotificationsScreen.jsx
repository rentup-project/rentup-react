import moment from "moment";
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getNotifications } from '../../services/Account.services';
import AuthContext from './../../contexts/AuthContext';
import './NotificationsScreen.css';
/* IMAGES */
import ghostImage from "../../assets/images/ghost-image.png";
import BillPaidIcon from '../../assets/images/nofitications/BillPaid-icon.png';
import NewBillIcon from '../../assets/images/nofitications/NewBill-icon.png';
import MessageIcon from '../../assets/images/nofitications/Message-icon.png';
import ReserveIcon from '../../assets/images/nofitications/Reserve-icon.png';
import ContractIcon from '../../assets/images/nofitications/Contract-icon.png';

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(currentUser) {
      setLoading(true);
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
                notification.message ="The owner uploaded the contract.";
            }
          })
          setNotifications(res);
          setLoading(false);
        } else {
         setLoading(true);
        }
      })
      .catch((err) => navigate("/error"))
    }
  }, [currentUser, navigate])

  return (
    <div className="notifications-screen">
      <h2>Notifications</h2>
      {loading && (
        <div className="spinner-container">
          <span className="loader"></span>
        </div>
      )}
      {!loading && notifications.length === 0 && (
        <div className="no-content-div">
          <h4>You have no notifications.</h4>
          <img src={ghostImage} alt="ghost" />
        </div>
      )}
      {!loading && notifications.length > 0 && (
        <>
          <div className="notification-messages-container">
            {notifications.map((notification) => (
              <>
                <Link
                  id="notification-icon-wrapper"
                  to={notification.path}
                  key={notification.id}
                >
                <div id="notification-img-wrapper">
                    {notification.type === "message" && (
                      <div
                        className="notification-icon"
                        style={{
                          backgroundImage: `url(${MessageIcon})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    )}

                    {notification.type === "billPaid" && (
                      <div
                        className="notification-icon"
                        style={{
                          backgroundImage: `url(${BillPaidIcon})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    )}

                    {notification.type === "billUploaded" && (
                      <div
                        className="notification-icon"
                        style={{
                          backgroundImage: `url(${NewBillIcon})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    )}

                    {notification.type === "reservation" && (
                      <div
                        className="notification-icon"
                        style={{
                          backgroundImage: `url(${ReserveIcon})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    )}

                    {notification.type === "rent" && (
                      <div
                        className="notification-icon"
                        style={{
                          backgroundImage: `url(${ContractIcon})`,
                          backgroundRepeat: "no-repeat",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    )}
                </div>

                  <div className="msg-container">
                    <p className="msg-p">{notification.message}</p>
                    <p className="msg-time">
                      {moment(notification.createdAt).format(
                        "DD/MM/YY - hh:mm"
                      )}
                    </p>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
