import React from 'react'
import { useParams } from 'react-router-dom'
import { activateAccount } from '../services/Auth.services'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoadingScreen() {
    const { token } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        activateAccount(token)
        .then((res) => {
            if(res.status === 202) {
                navigate("/")
            }
            navigate('/login')
        })
        .catch(navigate('/login'))
    }, [token, navigate])

  return (
    <div>Loading...</div>
  )
}
