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
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const updateUserList = useCallback(() => {
    selectUser(currentUser.id)
      .then((res) => {
        setList(res);
      })
      .catch((err) => {
        navigate('/error')
      });
    }, [navigate, currentUser]);
    
  useEffect(() => {
    if (currentUser) {
      console.log(currentUser)
      if (ownerId) {
        console.log(ownerId, 'entra')
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
    <div className={!receiverId && listOfMessages.length === 0 ? "ghost-message-container" : "messages-section-container"}>
      {
        !receiverId && listOfMessages.length === 0 ?
        <div className='no-content-div'>
          <h4>You have no messages. Go talk to someone!</h4>
          <img src={ghostImage} alt="ghost" />
        </div>
        :
        <>
        <div className="list-of-messages-container">
          {
            listOfMessages.length > 0 && listOfMessages.map((person) => (
            <div
              onClick={handleOnClick}
              id={person.id}
              key={person.id}
              className="person-list-container"
            >
              <p onClick={handleOnClick}
              id={person.id}>{person.name}</p>
            </div>
          ))}
        </div>
          
        <div className="messages-container">
          {
            receiverId && 
            <Message receiverId={receiverId} />
          }
        </div>
        </>
      }
    </div>
  );
}
