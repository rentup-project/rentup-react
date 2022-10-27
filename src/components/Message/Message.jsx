import moment from "moment";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../services/Auth.services';
import { createMessage, getMessages } from './../../services/Messages.services';
import { getOneUser } from './../../services/Users.services';
import './Message.css';

export default function Message( {ownerId} ) {
    const [currentUser, setCurrentUser] = useState('')
    const [owner, setOwner] = useState('')
    const [messages, setMessages] = useState([])
    const [messageToSend, setMessageToSend] = useState('')
    const [update, setUpdate] = useState(false)
    const navigate = useNavigate()

    useEffect(()=> {
        getOneUser(ownerId)
        .then((owner) => {
            setOwner(owner)
            getCurrentUser()
            .then((currentUser) => {
                setCurrentUser(currentUser)
                getMessages(currentUser.id, owner.id)
                .then((res) => {
                    setMessages(res)
                    setUpdate(false)
                })
                .catch((err) => navigate("/error"))
            })
            .catch((err) => navigate("/error"))
        })
        .catch((err) => navigate("/error"))
    }, [update])

    const handleOnChange = (e) => {
        const { value } = e.target
        setMessageToSend(value) 
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const body = {
            sender: currentUser.id,
            receiver: owner.id,
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
        <div>
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
                <textarea id="msg" name="msg" rows="5" onChange={handleOnChange} value={messageToSend}></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}
