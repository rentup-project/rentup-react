import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { getPrequalification } from "../../services/MyArea.services";
import "./PropActionsCard.css";

export default function PropActionsCard( { property } ) {
  const {
    owner,
    id,
    requiredJobDuration,
    requiredAnnualSalary,
    petAllowed,
    tenantsQuantity
  } = property;
  const [prequalification, setPrequalification] = useState('');
  const [meetMinimumRequirements, setMeetMinimumRequirements] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser){
      getPrequalification(currentUser.id)
        .then((res) => setPrequalification(res))
        .catch((err) => navigate('/error'));
    }
  },[currentUser, navigate])


  useEffect(() => {
    if (prequalification) {
        if (
          requiredJobDuration === "More than 3 months" ||
          (requiredJobDuration === "One year" &&
            prequalification.jobDuration === "One year") ||
          (requiredJobDuration === "One year" &&
            prequalification.jobDuration === "More than a year") ||
          (requiredJobDuration === "More than a year" &&
            prequalification.jobDuration === "More than a year")
        ) {
          if (requiredAnnualSalary <= prequalification.annualSalary) {
            if (tenantsQuantity >= prequalification.tenantsQuantity) {
              if (
                (!petAllowed && prequalification.hasPet === "No") ||
                petAllowed
              ) {
                setMeetMinimumRequirements(true);
              }
            }
          }
        }
      } else {
        setMeetMinimumRequirements(false);
      }
  }, [petAllowed, prequalification, requiredAnnualSalary, requiredJobDuration, tenantsQuantity])

  return (
    <div className="prop-actions-container">
      <div className="prop-actions-container-wrapper">
        {!currentUser && (
          <div>
            Hey! If you want to take any action related to this property, you
            have to log in.
          </div>
        )}
        {currentUser && !prequalification && (
          <div>
            Please, complete the prequalifications form so you can get more
            information about this property.
            <Link
              to={"/my-area/prequalification"}
              target="_blank"
              className="actions-btn-blue"
            >
              Complete prequalifications
            </Link>
          </div>
        )}
        {currentUser && prequalification && !meetMinimumRequirements && (
          <div id="minimum-requirements-wrapper">
            <p>
              Unfortunately, you don't meet the minimum requirements to rent
              this property.
            </p>
            <span>Check the minimum requirements:</span>
            <ul>
              <li>Job duration: {requiredJobDuration}</li>
              <li>Annual salary: {requiredAnnualSalary} €</li>
              <li>Maximum tenants quantity: {tenantsQuantity}</li>
              {!petAllowed && <li>Pets aren't allowed</li>}
            </ul>
          </div>
        )}

        <div>
          <Link
            to={
              prequalification && meetMinimumRequirements
                ? `/visits/select/${id}`
                : "#"
            }
            className={
              prequalification && meetMinimumRequirements
                ? "actions-btn-yellow"
                : "disabled"
            }
          >
            Visit
          </Link>
          <Link
            to={
              prequalification && meetMinimumRequirements
                ? `/payment/reserve/${id}`
                : "#"
            }
            className={
              prequalification && meetMinimumRequirements
                ? "actions-btn-yellow"
                : "disabled"
            }
          >
            Reserve this property
          </Link>
          {owner && (
            <Link
              to={currentUser ? `/my-area/${owner.id}` : "#"}
              className={currentUser ? "actions-btn-blue" : "disabled"}
            >
              Contact
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}