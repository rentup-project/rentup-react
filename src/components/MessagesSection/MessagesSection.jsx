import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ghostImage from '../../assets/images/ghost-image.png';
import AuthContext from "../../contexts/AuthContext";
import { selectUser } from "../../services/Messages.services";
import Message from "../Message/Message";
import "./MessagesSection.css";

export default function MessagesSection({ ownerId }) {
  const [listOfMessages, setList] = useState([]);
  const [receiverId, setReceiverId] = useState(null);
  const [loading, setLoading] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateUserList = useCallback(() => {
    selectUser(currentUser.id)
      .then((res) => {
        setList(res);
        setLoading(false);
      })
      .catch((err) => {
        navigate('/error')
      });
    }, [navigate, currentUser]);
    
  useEffect(() => {
    if (currentUser) {
      setLoading(true);

      if (ownerId) {
        setReceiverId(ownerId);
      }
      updateUserList();
    }
  }, [currentUser, ownerId, updateUserList]);

  const handleOnClick = (e) => {
    const { id } = e.target;
    setReceiverId(id);
  };

  return (
    <div
      className={
        !receiverId && listOfMessages.length === 0
          ? "ghost-message-container"
          : "messages-section-container"
      }
    >
      {loading && (
        <div className="spinner-container">
          <span className="loader"></span>
        </div>
      )}

      {!loading && !receiverId && listOfMessages.length === 0 && (
        <div className="no-content-div">
          <h4>You have no messages. Go talk to someone!</h4>
          <img src={ghostImage} alt="ghost" />
        </div>
      )}
      
      {!loading && listOfMessages.length > 0 && (
        <>
          <div className="list-of-messages-container">
            {listOfMessages.length > 0 &&
              listOfMessages.map((person) => (
                <div
                  onClick={handleOnClick}
                  id={person.id}
                  key={person.id}
                  className="person-list-container"
                >
                  <p onClick={handleOnClick} id={person.id}>
                    {person.name}
                  </p>
                </div>
              ))}
          </div>

          <div className="messages-container">
            {receiverId && <Message receiverId={receiverId} />}
          </div>
        </>
      )}
    </div>
  );
}
