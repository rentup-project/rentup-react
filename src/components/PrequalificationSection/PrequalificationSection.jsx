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
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOnClick = () => {
    setFormCompleted(false);
    setEdit(true);
  };

  const fetchPrequalification = useCallback(() => {
    if (currentUser) {
      getPrequalification(currentUser.id)
        .then((form) => {
          if (form) {
            setFormCompleted(true);
            setPrequalification(form);
          } else {
            setFormCompleted(false);
          }
        })
        .catch((err) => navigate("/error"));
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    fetchPrequalification();
  }, [fetchPrequalification]);

  return formCompleted ? (
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
          <span>{prequalification.annualSalary}</span>
        </div>
        <div>
          Guarantee:
          <span>{prequalification.hasGuarantee}</span>
        </div>
      </div>
      <button onClick={handleOnClick}>Edit</button>
    </div>
  ) : (
    <div id="prequalification-container">
      <span>
        Hi! You haven't completed the prequalification form yet. Please do it,
        it only takes 2 minutes.
      </span>
      <PrequalificationsForm
        onPrequalificationModified={fetchPrequalification}
        action={edit ? "edit" : "create"}
      />
    </div>
  );
}
