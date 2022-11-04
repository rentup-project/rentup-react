import React from 'react';
import RentForm from '../../components/RentForm/RentForm';
import './MyRentDetailsScreen.css'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function MyRentDetailsScreen() {
  const { id } = useParams()

  useEffect(() => {
    
  })

  return (
    <div className='rent-details-screen'>
      <RentForm propertyId={id} />
    </div>
  )
}
