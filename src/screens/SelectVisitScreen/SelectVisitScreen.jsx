import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchVisits } from './../../services/Visits.services';
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
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetchVisits(id)
        .then(res => setVisits(res))
        .catch(err => navigate('/err'))
    }, [id, navigate])

    useEffect(() => {
        if (visits.length > 0) {
            visits.map(visit => {
                if (visit.day === 'Monday') {
                    setMondayHours(prev => [...prev, visit])
                } else if (visit.day === 'Tuesday') {
                    setTuesdayHours(prev => [...prev, visit])
                } else if (visit.day === 'Wednesday') {
                    setWednesdayHours(prev => [...prev, visit])
                }else if (visit.day === 'Thursday') {
                    setThursdayHours(prev => [...prev, visit])
                }else if (visit.day === 'Friday') {
                    setFridayHours(prev => [...prev, visit])
                }else if (visit.day === 'Saturday') {
                    setSaturdayHours(prev => [...prev, visit])
                } else {
                    setSundayHours(prev => [...prev, visit])
                }
            })
        }
    }, [visits])

    const handleOnClick = (e) => {
        setVisitId(e.target.id)
    }

    const handleOnSubmit = () => {
        //HACER LA PETICIÓN CON EL ID DE LA VISIT Y CURRENT USER
    }

  return (
    <>
        <div className='select-visit-screen'>
            {
                visits.length > 0 && mondayHours.length > 0 && 
                (<div className="hours-wrapper">
                    <h4>Monday</h4>
                    {
                        mondayHours.map(visit => (
                            <div className={ visit.reserved ? `disabled` : `hour`} id={visit.id} key={`${visit.id}`} onClick={handleOnClick}>
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
                            <div className={ visit.reserved ? `disabled` : `hour`} id={visit.id} key={`${visit.id}`} onClick={handleOnClick}>
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
                            <div className={ visit.reserved ? `disabled` : `hour`} id={visit.id} key={`${visit.id}`} onClick={handleOnClick}>
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
                            <div className={ visit.reserved ? `disabled` : `hour`} id={visit.id} key={`${visit.id}`} onClick={handleOnClick}>
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
                            <div className={ visit.reserved ? `disabled` : `hour`} id={visit.id} key={`${visit.id}`} onClick={handleOnClick}>
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
                            <div className={ visit.reserved ? `disabled` : `hour`} id={visit.id} key={`${visit.id}`} onClick={handleOnClick}>
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
                            <div className={ visit.reserved ? `disabled` : `hour`} id={visit.id} key={`${visit.id}`} onClick={handleOnClick}>
                                {visit.hour}
                            </div>
                        ))
                    }
                </div>)
            }
        </div>
        <button handleOnClick={handleOnSubmit} className={visitId ? `submit-btn` : 'disabled'}>Schedule visit</button>
    </>
  )
}
