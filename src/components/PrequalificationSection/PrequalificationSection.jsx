import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { getPrequalification } from "../../services/MyArea.services";
import PrequalificationsForm from "../PrequalificationsForm/PrequalificationsForm";
import "./PrequalificationSection.css";
import { useCallback } from "react";

export default function PrequalificationSection() {
  const [formCompleted, setFormCompleted] = useState("");
  const [edit, setEdit] = useState("");
  const [prequalification, setPrequalification] = useState("");
  const [loading, setLoading] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnClick = () => {
    setFormCompleted(false);
    setEdit(true);
  };

  const fetchPrequalification = useCallback(() => {
    if (currentUser) {
      setLoading(true);
      getPrequalification(currentUser.id)
        .then((form) => {
          if (form) {
            setFormCompleted(true);
            setPrequalification(form);
            setLoading(false);
          } else {
            setFormCompleted(false);
            setLoading(false);
          }
        })
        .catch((err) => navigate("/error"));
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchPrequalification();
  }, [fetchPrequalification]);

  return (
    <>
      {loading && (
        <div className="spinner-container">
          <span className="loader"></span>
        </div>
      )}
  
      {!loading && formCompleted && (
        <div id="prequalification-container">
          <div className="prequalification-data-wrapper">
            <div>
              Tenants Quantity:<span>{prequalification.tenantsQuantity}</span>
            </div>
            <div>
              Pets:
              <span>{prequalification.hasPet}</span>
            </div>
            <div>
              Job Duration:
              <span>{prequalification.jobDuration}</span>
            </div>
            <div>
              Annual Salary:
              <span>{prequalification.annualSalary} €</span>
            </div>
            <button onClick={handleOnClick}>Edit</button>
          </div>
        </div>
      )}
  
      {!loading && !formCompleted && (
        <div id="prequalification-container">
          <div className="prequalification-container-form">
            <span>
              Hi! You haven't completed the prequalification form yet. Please do it,
              it only takes 2 minutes.
            </span>
            <PrequalificationsForm
              onPrequalificationModified={fetchPrequalification}
              action={edit ? "edit" : "create"}
            />
          </div>
        </div>
      )}
    </>
  )
}
