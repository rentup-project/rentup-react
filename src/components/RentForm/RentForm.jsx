import React, { useContext, useEffect, useState } from 'react';
import { createRent } from '../../services/Properties.services';
import AuthContext from './../../contexts/AuthContext';
import './RentForm.css';

export default function RentForm({ propertyId }) {
    const [mongoErr, setMongoErr] = useState("")
    const [rentInfo, setRentInfo] = useState({})
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        if(currentUser) {
            setRentInfo(prev => ({...prev, property: propertyId }))
            setRentInfo(prev => ({...prev, userWhoRents: currentUser.id }))
        }
    }, [currentUser, propertyId])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        for (let info in rentInfo) {
            formData.append(info, rentInfo[info])
        }

        createRent(formData)
        .then(res => window.location.reload())
        .catch(err => err?.response?.data && setMongoErr(err.response.data.errors))
    }

    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target
        if (type === 'file') {
            setRentInfo({...rentInfo, [name]: files[0]})
        } else {
            setRentInfo({...rentInfo, [name]: value})
        }
    }

  return (
    <div className='rent-form'>
        <form className='rent-form-container' onSubmit={handleOnSubmit}>
            <label className="form-label my-3" htmlFor="pricePerMonth">
                Price per month
            </label>
            <input className={`form-control ${mongoErr.pricePerMonth ? "is-invalid" : ""}`} 
            type="number" id="pricePerMonth" name="pricePerMonth" onChange={handleOnChange}>
            </input>
            {mongoErr.pricePerMonth && (
                <div className="invalid-feedback">{mongoErr.pricePerMonth}</div>
            )}
            <label className="form-label my-3" htmlFor="startDate">
                Start date
            </label>
            <input className={`form-control ${mongoErr.startDate ? "is-invalid" : ""}`}
            type="date" id="startDate" name="startDate" onChange={handleOnChange}>
            </input>
            {mongoErr.startDate && (
                <div className="invalid-feedback">{mongoErr.startDate}</div>
            )}
            <label className="form-label my-3" htmlFor="monthsDuration">
                Duration of the contract, in months
            </label>
            <input className={`form-control ${mongoErr.monthsDuration ? "is-invalid" : ""}`}
            type="number" id="monthsDuration" name="monthsDuration" onChange={handleOnChange}>
            </input>
            {mongoErr.monthsDuration && (
                <div className="invalid-feedback">{mongoErr.monthsDuration}</div>
            )}
            <label className="form-label my-3" htmlFor="contract">
                Upload the contract signed
            </label>
            <input className={`form-control ${mongoErr.contract ? "is-invalid" : ""}`} 
            type="file" id="contract" name="contract" onChange={handleOnChange}>
            </input>
            {mongoErr.contract && (
                <div className="invalid-feedback">{mongoErr.contract}</div>
            )}
            <button className="rent-submit-btn" type="submit">Create rent</button>
        </form>
    </div>
  )
}
