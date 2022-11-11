import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from './../../contexts/AuthContext';
import { fetchAvailableVisits, reserveVisit } from './../../services/Visits.services';
import './SelectVisitScreen.css';

export default function SelectVisitScreen() {
    const [visits, setVisits] = useState([])
    const [mondayHours, setMondayHours] = useState([])
    const [tuesdayHours, setTuesdayHours] = useState([])
    const [wednesdayHours, setWednesdayHours] = useState([])
    const [thursdayHours, setThursdayHours] = useState([])
    const [fridayHours, setFridayHours] = useState([])
    const [saturdayHours, setSaturdayHours] = useState([])
    const [sundayHours, setSundayHours] = useState([])
    const [visitId, setVisitId] = useState(null)
    const [errMessage, setErrMessage] = useState(null)
    const { id } = useParams()
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext)

    useEffect(() => {
        fetchAvailableVisits(id)
        .then(res => setVisits(res))
        .catch(err => navigate('/err'))
    }, [id, navigate])

    const setDays = useCallback(() => {
        if (visits.length > 0) {
            const sorted = visits.sort((a, b) =>  a.hour - b.hour)
            sorted.map(visit => {
                if (visit.day === 'Monday') {
                    return setMondayHours(prev => [...prev, visit])
                } else if (visit.day === 'Tuesday') {
                    return setTuesdayHours(prev => [...prev, visit])
                } else if (visit.day === 'Wednesday') {
                    return setWednesdayHours(prev => [...prev, visit])
                }else if (visit.day === 'Thursday') {
                    return setThursdayHours(prev => [...prev, visit])
                }else if (visit.day === 'Friday') {
                    return setFridayHours(prev => [...prev, visit])
                }else if (visit.day === 'Saturday') {
                    return setSaturdayHours(prev => [...prev, visit])
                } else {
                    return setSundayHours(prev => [...prev, visit])
                }
            })
        }
    }, [visits])

    useEffect(() => {
        setDays()
    }, [setDays])

    const handleOnClick = (e) => {
        setVisitId(e.target.id)
    }

    const handleReturn = () => {
        navigate(`/property/${id}`)
    }

    const handleOnSubmit = () => {
        if (currentUser) {
            reserveVisit(visitId, currentUser.id, id)
            .then(res => {
                if (res.message) {
                    setErrMessage(res.message)
                } else {
                    navigate('/my-area/visits')
                }
            })
            .catch(err => navigate('/err'))
        }
    }

  return (
    <div className='select-visit-screen'>
        {
            errMessage && <h5>{errMessage}</h5>
        }
        <div className='select-visit-screen-container'>
            {
                visits.length > 0 && mondayHours.length > 0 && 
                (<div className="hours-wrapper">
                    <h4>Monday</h4>
                    {
                        mondayHours.map(visit => (
                            <div className={visitId === visit.id ? 'selected' : (visit.reserved ? `disabled` : `hour`)} 
                            id={visit.id} key={`${visit.id}`} onClick={!visit.reserved ? handleOnClick : undefined}>
                                {visit.hour}
                            </div>
                        ))
                    }
                </div>)
            }
            {
                visits.length > 0 && tuesdayHours.length > 0 && 
                (<div className="hours-wrapper">
                    <h4>Tuesday</h4>
                    {
                        tuesdayHours.map(visit => (
                            <div className={visitId === visit.id ? 'selected' : (visit.reserved ? `disabled` : `hour`)} 
                            id={visit.id} key={`${visit.id}`} onClick={!visit.reserved ? handleOnClick : undefined}>
                                {visit.hour}
                            </div>
                        ))
                    }
                </div>)
            }
            {
                visits.length > 0 && wednesdayHours.length > 0 && 
                (<div className="hours-wrapper">
                    <h4>Wednesday</h4>
                    {
                        wednesdayHours.map(visit => (
                            <div className={visitId === visit.id ? 'selected' : (visit.reserved ? `disabled` : `hour`)} 
                            id={visit.id} key={`${visit.id}`} onClick={!visit.reserved ? handleOnClick : undefined}>
                                {visit.hour}
                            </div>
                        ))
                    }
                </div>)
            }
            {
                visits.length > 0 && thursdayHours.length > 0 && 
                (<div className="hours-wrapper">
                    <h4>Thursday</h4>
                    {
                        thursdayHours.map(visit => (
                            <div className={visitId === visit.id ? 'selected' : (visit.reserved ? `disabled` : `hour`)} 
                            id={visit.id} key={`${visit.id}`} onClick={!visit.reserved ? handleOnClick : undefined}>
                                {visit.hour}
                            </div>
                        ))
                    }
                </div>)
            }
            {
                visits.length > 0 && fridayHours.length > 0 && 
                (<div className="hours-wrapper">
                    <h4>Friday</h4>
                    {
                        fridayHours.map(visit => (
                            <div className={visitId === visit.id ? 'selected' : (visit.reserved ? `disabled` : `hour`)} 
                            id={visit.id} key={`${visit.id}`} onClick={!visit.reserved ? handleOnClick : undefined}>
                                {visit.hour}
                            </div>
                        ))
                    }
                </div>)
            }
            {
                visits.length > 0 && saturdayHours.length > 0 && 
                (<div className="hours-wrapper">
                    <h4>Saturday</h4>
                    {
                        saturdayHours.map(visit => (
                            <div className={visitId === visit.id ? 'selected' : (visit.reserved ? `disabled` : `hour`)} 
                            id={visit.id} key={`${visit.id}`} onClick={!visit.reserved ? handleOnClick : undefined}>
                                {visit.hour}
                            </div>
                        ))
                    }
                </div>)
            }
            {
                visits.length > 0 && sundayHours.length > 0 && 
                (<div className="hours-wrapper">
                    <h4>Friday</h4>
                    {
                        sundayHours.map(visit => (
                            <div className={visitId === visit.id ? 'selected' : (visit.reserved ? `disabled` : `hour`)} 
                            id={visit.id} key={`${visit.id}`} onClick={!visit.reserved ? handleOnClick : undefined}>
                                {visit.hour}
                            </div>
                        ))
                    }
                </div>)
            }
        </div>
        <div id="btns-visit-wrapper">
            <button onClick={handleReturn} className={`submit-btn`}>Go back</button>
            <button onClick={handleOnSubmit} className={visitId ? `submit-btn` : 'disabled'}>Schedule visit</button>
        </div>
    </div>
  )
}
