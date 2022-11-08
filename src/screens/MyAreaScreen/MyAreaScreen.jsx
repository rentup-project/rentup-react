import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountSection from "../../components/AccountSection/AccountSection";
import MessagesSection from "../../components/MessagesSection/MessagesSection";
import MyProperties from "../../components/MyProperties/MyProperties";
import MyRentsSection from "../../components/MyRentsSection/MyRentsSection";
import PrequalificationSection from "../../components/PrequalificationSection/PrequalificationSection";
import "./MyAreaScreen.css";
import AuthContext from './../../contexts/AuthContext';
import { useContext } from "react";

export default function MyAreaScreen() {
  const [section, setSection] = useState("account");
  const { owner, prequalification } = useParams();
  const { currentUser } = useContext(AuthContext);

  const handleOnClick = (e) => {
    const { id } = e.target;
    setSection(id);
  };

  useEffect(() => {
    if (owner) {
      setSection("messages");
    }

    if (window.location.pathname === "/my-area/prequalification") {
      setSection("prequalification");
    }

    if (window.location.pathname === "/my-area/messages") {
      setSection("messages");
    }

    if (window.location.pathname === "/my-area/myRents") {
      setSection("myRents");
    }
    
  }, [owner, prequalification]);

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
          { owner === currentUser.id && 
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
          }
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

      {section === "messages" && <MessagesSection ownerId={owner} />}
    </div>
  );
}
