import React, { useEffect } from 'react';
import MyProperties from '../../components/MyProperties/MyProperties';
import PrequalificationsForm from '../../components/PrequalificationsForm/PrequalificationsForm';
import './MyAreaScreen.css';

export default function MyAreaScreen() {
  
  useEffect(() => {
    console.log(new URLSearchParams(window.location.search).get(
      "redirect_status"
    ))
  })
  
  return (
    <div className='my-area-container'>
      <h3>My Personal Area</h3>

      <MyProperties />

      <PrequalificationsForm create="true" />
    </div>
  );
}