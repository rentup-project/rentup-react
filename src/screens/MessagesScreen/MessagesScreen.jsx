import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message/Message';
import AuthContext from "../../contexts/AuthContext";
import { selectUser } from '../../services/Messages.services';
import './MessagesScreen.css';

export default function MessagesScreen({ ownerId }) {
  const [listOfMessages, setList] = useState([])
  const [receiverId, setReceiverId] = useState('')
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser) {
      if (ownerId) {
        setReceiverId(ownerId);
      }
      selectUser(currentUser.id)
        .then((res) => {
          setList(res);
        })
        .catch((err) => {
          navigate("/error");
        });
    }
  }, [currentUser, navigate, ownerId]);

  const handleOnClick = (e) => {
    const { id } = e.target
    setReceiverId(id)
  }

  return (
    <div className="messages-screen">
      <div className="list-of-messages-container">
        {listOfMessages.map((person) => (
          <div
            onClick={handleOnClick}
            id={person.id}
            key={person.id}
            className="person-list-container"
          >
            <p>{person.name}</p>
          </div>
        ))}
      </div>
      <div className="messages-container">
        {listOfMessages.length || ownerId ? (
          <Message receiverId={receiverId} />
        ) : (
          <h4>You have no messages</h4>
        )}
      </div>
    </div>
  );
}
