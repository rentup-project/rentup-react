import moment from "moment";
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../contexts/AuthContext";
import { createMessage, getMessages } from './../../services/Messages.services';
import { getOneUser } from './../../services/Users.services';
import './Message.css';

export default function Message({ receiverId }) {
    const [receiver, setReceiver] = useState('')
    const [messages, setMessages] = useState([])
    const [messageToSend, setMessageToSend] = useState('')
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);

    useEffect(()=> {
        if (currentUser && receiverId) {
          getOneUser(receiverId)
            .then((receiver) => {
              setReceiver(receiver);
              getMessages(currentUser.id, receiverId)
                .then((res) => {
                  setMessages(res);
                  setUpdate(false);
                })
                .catch((err) => navigate("/error"));
            })
            .catch((err) => navigate("/error"));
        }
    }, [update, currentUser, receiverId, navigate])

    const handleOnChange = (e) => {
        const { value } = e.target
        setMessageToSend(value) 
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const body = {
            sender: currentUser.id,
            receiver: receiver.id,
            msg: messageToSend
        }

        createMessage(body)
        .then((res) => {
            setUpdate(true)
            setMessageToSend('')
        })
        .catch((err) => navigate("/error"))        
    }

    return (
        receiverId &&
        (<div>
            <div className="messages-scroll-container">
                {
                    [...messages].map((msg) => (
                        <div key={msg._id} className={`each-message ${msg.sender.id === currentUser.id ? 'mine' : 'theirs'}`}>
                            <p className='timestamp'>
                                <span>
                                    {msg.sender.name} -
                                </span>
                                <span>
                                    {moment(msg.createdAt).format('DD/MM/YY - hh:mm')}
                                </span>
                            </p>
                            <p className='text-content'>{msg.msg}</p>
                        </div>  
                    ))
                }
            </div>
            <form onSubmit={handleOnSubmit} className='messages-form'>
                <textarea id="msg" name="msg" rows="3" onChange={handleOnChange} 
                value={messageToSend} placeholder="Type your message here"></textarea>
                <button>Send</button>
            </form>
        </div>)
    )
}
