import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Message from '../../components/Message/Message';
import AuthContext from "../../contexts/AuthContext";
import { selectUser } from '../../services/Messages.services';
import './MessagesScreen.css';

export default function MessagesScreen() {
  const [listOfMessages, setList] = useState([])
  const { id } = useParams()
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()

  useEffect(() => {
    if(currentUser) {
      selectUser(currentUser.id)
      .then(res => {
        setList(res)
      })
      .catch((err) => navigate("/error"))
    }
  }, [currentUser, navigate])

  return (
    <div className='messages-screen'>
        <div className='list-of-messages-container'>
            {
              listOfMessages !== [] ? 
              listOfMessages.map((person) =>
              <Link className="link-person-list-container" to={`/messages/${person.id}`}>
                <div key={person.id} className="person-list-container">
                    <p>{person.name}</p>
                </div>
              </Link>
              )
              :
              <h4>You have no messages</h4>
            }
        </div>
        <div className='messages-container'>
            <Message ownerId={id} />
        </div>
    </div>
  )
}
