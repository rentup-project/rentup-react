import React, { useEffect, useState } from 'react'
import { getOneUser } from './../../services/Users.services';
import { useNavigate } from 'react-router-dom';
import { getMessages } from './../../services/Messages.services';
import { getCurrentUser } from '../../services/Auth.services';

export default function Message( {ownerId} ) {
    const [currentUser, setCurrentUser] = useState('')
    const [owner, setOwner] = useState('')
    const [messages, setMessages] = useState([])
    const navigate = useNavigate()

    useEffect(()=> {
        getOneUser(ownerId)
        .then((owner) => {
            setOwner(owner)
            getCurrentUser()
            .then((currentUser) => {
                setCurrentUser(currentUser)
                getMessages(currentUser.id, owner.id)
                .then((res) => setMessages(res))
                .catch((err) => navigate("/error"))
            })
            .catch((err) => navigate("/error"))
        })
        .catch((err) => navigate("/error"))
    }, [])

    return (
        <div>
            AEEE
        </div>
    )
}
