import React, { useCallback, useContext, useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import downloadIcon from '../../assets/images/download-icon.png';
import { deleteManyBills, getAllBills } from '../../services/Bills.services';
import { payManyBillsIntent } from '../../services/Payment.services';
import BillForm from '../BillForm/BillForm';
import BillsPayment from '../BillsPayment/BillsPayment';
import AuthContext from './../../contexts/AuthContext';
import { getOneProperty } from './../../services/Properties.services';
import './BillsSection.css';

export default function BillsSection({ rent }) {
    const [successfulMessage, setSuccessfulMessage] = useState(false)
    const [bills, setBills] = useState([])
    const [openForm, setOpenForm] = useState(false)
    const [owner, setOwner] = useState(null)
    const [totalToPay, setTotalToPay] = useState(0)
    const [selectedBillsIds, setSelectedBillsIds] = useState([])
    const [billsToPay, setBillsToPay] = useState([])
    const [openPaymentSection, setOpenPaymentSection] = useState(false)
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    const setAllBills = useCallback((id) => {
        getAllBills(id)
            .then((res) => {
                setBills(res)
            })
            .catch(err => navigate('/error'))
    }, [navigate])

    useEffect(() => {
        getOneProperty(rent.property)
            .then((res) => {
                setOwner(res.owner.id)
            })
            .catch(err => navigate('/error'))

        setAllBills(rent.id)
    }, [rent, navigate, setAllBills])

    const handleOnClick = () => {
        if (openForm) {
            setOpenForm(false)
        } else {
            setOpenForm(true)
        }
    }

    const handleOnSelect = (e) => {
        const arrFromIdAndAmount = e.target.id.split(',')
        const id = arrFromIdAndAmount[0]
        const amount = Number(arrFromIdAndAmount[1])

        if (selectedBillsIds.includes(id)) {
            const filteredIdArr = [...selectedBillsIds].filter(bills => bills !== id)
            setSelectedBillsIds(filteredIdArr)
            setTotalToPay((prev) => prev -= amount)
        } else {
            setSelectedBillsIds([...selectedBillsIds, id])
            setTotalToPay((prev) => prev += amount)
        }
    }

    const handleDeleteBills = () => {
        if (selectedBillsIds.length !== 0) {
            deleteManyBills(selectedBillsIds)
                .then(res => setAllBills(rent.id))
                .catch(err => navigate('/error'))
        }
    }

    const handlePayBills = () => {
        if (selectedBillsIds.length !== 0) {
            const arrToPay = []
            selectedBillsIds.map((id) => {
                return bills.map((bill) => {
                    if (bill.id === id) {
                        return arrToPay.push(bill)
                    }
                    return null
                })
            })
            setBillsToPay(arrToPay)
            setOpenPaymentSection(true)
        }
    }

    return (
      <div className="bills-section">
        <div className="bills-form-container">
          {owner === currentUser.id && (
            <button onClick={handleOnClick}>
              {openForm ? "HIDE FORM" : "OPEN FORM"}
            </button>
          )}
          {owner === currentUser.id && openForm && <BillForm rent={rent.id} />}
          {owner !== currentUser.id && successfulMessage && (
            <h2>PAYMENT SUCCESSFUL</h2>
          )}
        </div>
        <div className="bills-container">
          <div className="bills-btns-container">
            {owner === currentUser.id ? (
              <div className="bills-btns">
                <button
                  onClick={handleDeleteBills}
                  className={
                    selectedBillsIds.length === 0 ? "disabledBill" : "working"
                  }
                >
                  DELETE SELECTED BILLS
                </button>
              </div>
            ) : (
              <div className="bills-btns">
                <div>TOTAL TO PAY: {totalToPay} €</div>
                <button
                  onClick={handlePayBills}
                  className={
                    selectedBillsIds.length === 0 || openPaymentSection
                      ? "disabledBill"
                      : "working"
                  }
                >
                  PAY SELECTED BILLS
                </button>
              </div>
            )}
          </div>
          {!openPaymentSection &&
            bills !== [] &&
            bills.map((bill) => (
              <div className="each-bill" key={bill.id}>
                <div className="each-bill-info">
                  <a href={bill.file} target="_blank" rel="noreferrer" download>
                    <img src={downloadIcon} alt="download" width="30px" />
                  </a>
                  <div>
                    <h5>Type:</h5>
                    <p>{bill.type.toUpperCase()}</p>
                  </div>
                  <div>
                    <h5>Amount:</h5>
                    <p>{bill.amount}€</p>
                  </div>
                  <div>
                    <h5>Due date:</h5>
                    <Moment format="MMMM YY" date={bill.dueDate}/>
                  </div>
                </div>
                <div
                  className={`status ${
                    bill.paymentStatus === "paid" ? "green" : "red"
                  }`}
                >
                  <p>{bill.paymentStatus.toUpperCase()}</p>
                </div>
                <div className="actions-div">
                  <form onChange={handleOnSelect}>
                    {owner === currentUser.id &&
                      bill.paymentStatus !== "paid" && (
                        <input
                          type="checkbox"
                          id={`${bill.id},${bill.amount}`}
                        ></input>
                      )}
                    {rent.userWhoRents === currentUser.id &&
                      bill.paymentStatus !== "paid" && (
                        <input
                          type="checkbox"
                          id={`${bill.id},${bill.amount}`}
                        ></input>
                      )}
                  </form>
                </div>
              </div>
            ))}
          {openPaymentSection && (
            <BillsPayment billsToPay={billsToPay} rent={rent.id} />
          )}
        </div>
      </div>
    );
}
