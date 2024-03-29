import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import socket from "../../helpers/socketHelper";
import { getUserWhoRents } from '../../services/MyArea.services';
import { createBill } from './../../services/Bills.services';
import './BillForm.css';

export default function BillForm({ rent }) {
    const [mongoErr, setMongoErr] = useState({});
    const [billsInfo, setBillsInfo] = useState([]);
    const [userWhoRentsEmail, setUserWhoRentsEmail] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      setBillsInfo((prev) => ({ ...prev, rent }));

      getUserWhoRents(id)
        .then((res) => setUserWhoRentsEmail(res.userWhoRents.email))
        .catch((err) => navigate("/error"))

    }, [id, navigate, rent]);


    const handleOnSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()

        if (!billsInfo.type) {
            billsInfo.type = 'water'
        }

        if (!billsInfo.paymentStatus) {
            billsInfo.paymentStatus = 'pending payment'
        }

        for (let info in billsInfo) {
            formData.append(info, billsInfo[info])        
        }

        createBill(formData)
        .then((res) => {
            console.log(userWhoRentsEmail)
            socket.emit("notification", userWhoRentsEmail);       
            window.location.reload()
        })
        .catch(err => err?.response?.data && setMongoErr(err.response.data.errors))
     }

    const handleOnChange = (e) => {
        const { name, value, type, files } = e.target
        if (type === 'file') {
            setBillsInfo({ ...billsInfo, [name]: files[0] })
        } else {
            setBillsInfo({ ...billsInfo, [name]: value })
        }
    }

  return (
    <form onSubmit={handleOnSubmit} id="bill-form-container">
        <div>
            <label className="form-label my-3" htmlFor="type">
                Choose a type
            </label>
            <select id ="type" name ="type" value={billsInfo.type} className={`form-select ${mongoErr?.amount ? "is-invalid" : ""}`} onChange={handleOnChange}>
                <option value="water">Water</option>
                <option value="electricity">Electricity</option>
                <option value="gas">Gas</option>
                <option value="condominium fee">Condominium fee</option>
                <option value="monthly rent">Monthly rent</option>
                <option value="other">Other</option>
            </select>
            {mongoErr?.type && (
                <div className="invalid-feedback">{mongoErr?.type}</div>
            )}
        </div>

        <div>
            <label className="form-label my-3" htmlFor="amount">
                Amount
            </label>
            <input className={`form-control ${mongoErr?.amount ? "is-invalid" : ""}`}
            type="number" id="amount" name="amount" onChange={handleOnChange}>
            </input>
            {mongoErr?.amount && (
                <div className="invalid-feedback">{mongoErr?.amount}</div>
            )}
        </div>

        <div>
            <label className="form-label my-3" htmlFor="dueDate">
                Due date
            </label>
            <input className={`form-control ${mongoErr?.dueDate ? "is-invalid" : ""}`}
            type="date" id="dueDate" name="dueDate" onChange={handleOnChange}>
            </input>
            {mongoErr?.dueDate && (
                <div className="invalid-feedback">{mongoErr?.dueDate}</div>
            )}
        </div>

        <div>
            <label className="form-label my-3" htmlFor="paymentStatus">
                Payment status
            </label>
            <select id="paymentStatus" name="paymentStatus" value={billsInfo.paymentStatus} className={`form-select ${mongoErr?.paymentStatus ? "is-invalid" : ""}`} onChange={handleOnChange}>
                <option value="paid">Already paid</option>
                <option value="pending payment">Pending payment</option>
            </select>
            {mongoErr?.paymentStatus && (
                <div className="invalid-feedback">{mongoErr?.paymentStatus}</div>
            )}
        </div>

        <div>
            <label className="form-label my-3" htmlFor="file">
                Bill file
            </label>
            <input
                type="file"
                name="file"
                id="file"
                onChange={handleOnChange}
                className={`form-control ${mongoErr?.file ? "is-invalid" : ""}`}
                multiple
            ></input>
            {mongoErr?.file && (
                <div className="invalid-feedback"> {mongoErr?.file}</div>
            )}
        </div>
        
        <button type="submit">Upload new bill</button>        
    </form>
    )
}
