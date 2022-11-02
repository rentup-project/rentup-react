import React, { useState } from 'react';
import AccountSection from '../../components/AccountSection/AccountSection';
import MyProperties from '../../components/MyProperties/MyProperties';
import PrequalificationSection from '../../components/PrequalificationSection/PrequalificationSection';
import { useParams } from 'react-router-dom';
import MessagesScreen from '../MessagesScreen/MessagesScreen';
import './MyAreaScreen.css';
import { useEffect } from 'react';
import MyRentsSection from '../../components/MyRentsSection/MyRentsSection';

export default function MyAreaScreen() {
  const [section, setSection] = useState('account');
  const { owner } = useParams();
  
  const handleOnClick = (e) => {
    const { id } = e.target;
    setSection(id)
  }

  useEffect(() => {
    if (owner) {
      setSection('messages')
    } 
  }, [owner])
    
  return (
    <div className="my-area-container">
      <div>
        <ul className="btns-sections-container">
          <li
            onClick={handleOnClick}
            className={
              section === "account" ? "section-selected" : "section-unselected"
            }
            id="account"
          >
            Account
          </li>
          <li
            onClick={handleOnClick}
            className={
              section === "prequalification"
                ? "section-selected"
                : "section-unselected"
            }
            id="prequalification"
          >
            Prequalification
          </li>
          <li
            onClick={handleOnClick}
            className={
              section === "myProperties"
                ? "section-selected"
                : "section-unselected"
            }
            id="myProperties"
          >
            My Properties
          </li>
          <li
            onClick={handleOnClick}
            className={
              section === "myRents" ? "section-selected" : "section-unselected"
            }
            id="myRents"
          >
            My rents
          </li>
          <li
            onClick={handleOnClick}
            className={
              section === "messages" ? "section-selected" : "section-unselected"
            }
            id="messages"
          >
            Messages
          </li>
          <li
            onClick={handleOnClick}
            className={
              section === "visits" ? "section-selected" : "section-unselected"
            }
            id="visits"
          >
            Visits
          </li>
        </ul>
      </div>

      {section === "account" && <AccountSection />}

      {section === "prequalification" && <PrequalificationSection />}

      {section === "myProperties" && <MyProperties />}

      {section === "myRents" && <MyRentsSection />}

      {section === "messages" && <MessagesScreen ownerId={owner} />}
    </div>
  );
}