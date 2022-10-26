import React from 'react'
import Message from '../../components/Message/Message'
import './MessagesScreen.css'
import { useParams } from 'react-router-dom';

export default function MessagesScreen() {
    const { id } = useParams()

  return (
    <div className='messages-screen'>
        <div className='list-of-messages-container'>
            <h2>List of messages</h2>
        </div>
        <div className='messages-container'>
            <Message ownerId={id} />
        </div>
    </div>
  )
}
