import React, { useContext, useEffect, useState } from 'react';
import { getAllBills } from '../../services/Bills.services';
import BillForm from '../BillForm/BillForm';
import AuthContext from './../../contexts/AuthContext';
import './BillsSection.css';
import { useNavigate } from 'react-router-dom';

export default function BillsSection({ rent }) {
    const [bills, setBills] = useState([])
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        getAllBills(rent.id)
        .then((res) => setBills(res))
        .catch(err => navigate('/error'))
    }, [rent])

    const handleOnChange = () => {

    }

  return (
    <div className='bills-section'>
        <div className='bills-form-container'>
            { 
                rent.userWhoRents !== currentUser && 
                    <BillForm rent={rent.id}/>
            }
        </div>
        <div className='bills-container'>
            {
                bills !== [] && bills.map(bill => (
                    <div className="each-bill">
                        <iframe src={bill.file} alt="bill"/>
                        <div>
                            <h5>Type</h5>
                            <p>{bill.type.toUpperCase()}</p>
                            <h5>Amount</h5>
                            <p>{bill.amount}€</p>
                            <h5>Due date</h5>
                            <p>{bill.dueDate}€</p>
                            <div className={`status ${bill.paymentStatus === 'paid' ? 'green' : 'red'}`}>
                                <p>{bill.paymentStatus.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}
