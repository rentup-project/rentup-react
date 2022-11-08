import React, { useContext, useState } from "react";
import AuthContext from "../../contexts/AuthContext";
import {
  completePrequalification,
  editPrequalification,
  getPrequalification,
} from "../../services/MyArea.services";
import "./PrequalificationsForm.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function PrequalificationsForm({
  action,
  onPrequalificationModified,
}) {
  const [mongoErr, setMongoErr] = useState("");
  const [prequalification, setPrequalification] = useState({});
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      getPrequalification(currentUser.id)
        .then((res) => setPrequalification(res))
        .catch((err) => navigate("/error"));
    }
  }, [navigate, currentUser]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPrequalification({ ...prequalification, [name]: value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (currentUser) {
      if (action === "create") {
        completePrequalification({
          ...prequalification,
          tenant: currentUser.id,
        })
          .then((res) => {
            onPrequalificationModified();
          })
          .catch(
            (err) =>
              err?.response?.data && setMongoErr(err.response.data.errors)
          );
      } else {
        editPrequalification(currentUser.id, prequalification)
          .then((res) => {
            onPrequalificationModified();
          })
          .catch(
            (err) =>
              err?.response?.data && setMongoErr(err.response.data.errors)
          );
      }
    }
  };

  return (
    <div className="prequalification-container">
      <form onSubmit={handleOnSubmit}>
        <div>
          <label htmlFor="tenantsQuantity" className="form-label">
            Tenants Quantity
          </label>
          <input
            type="number"
            value={prequalification?.tenantsQuantity}
            name="tenantsQuantity"
            id="tenantsQuantity"
            onChange={handleOnChange}
            className={`form-control ${
              mongoErr?.tenantsQuantity ? "is-invalid" : ""
            }`}
          ></input>
          {mongoErr?.tenantsQuantity && (
            <div className="invalid-feedback">{mongoErr?.tenantsQuantity}</div>
          )}
        </div>

        <div>
          <label htmlFor="hasPet" className="form-label">
            Pets
          </label>
          <select
            name="hasPet"
            id="hasPet"
            onChange={handleOnChange}
            className={`form-select ${mongoErr?.hasPet ? "is-invalid" : ""}`}
            aria-describedby="validationServer04Feedback"
            value={prequalification?.hasPet}
          >
            <option className="option-filter" name="selected" defaultValue>
              Select
            </option>
            <option className="option-filter" name="Yes">
              Yes
            </option>
            <option className="option-filter" name="No">
              No
            </option>
          </select>
          {mongoErr?.hasPet && (
            <div id="validationServer04Feedback" className="invalid-feedback">
              {mongoErr?.hasPet}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="jobDuration" className="form-label">
            Job Duration
          </label>
          <select
            name="jobDuration"
            id="jobDuration"
            onChange={handleOnChange}
            className={`form-select ${
              mongoErr?.jobDuration ? "is-invalid" : ""
            }`}
            aria-describedby="validationServer04Feedback"
            value={prequalification?.jobDuration}
          >
            <option className="option-filter" name="selected" defaultValue>
              Select
            </option>
            <option className="option-filter" name="More than 3 months">
              More than 3 months
            </option>
            <option className="option-filter" name="One year">
              One year
            </option>
            <option className="option-filter" name="More than a year">
              More than a year
            </option>
          </select>
          {mongoErr?.jobDuration && (
            <div id="validationServer04Feedback" className="invalid-feedback">
              {mongoErr?.jobDuration}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="annualSalary" className="form-label">
            Annual Salary
          </label>
          <input
            type="number"
            defaultValue={prequalification?.annualSalary}
            name="annualSalary"
            id="annualSalary"
            onChange={handleOnChange}
            className={`form-control ${
              mongoErr?.annualSalary ? "is-invalid" : ""
            }`}
          ></input>
          {mongoErr?.annualSalary && (
            <div className="invalid-feedback">{mongoErr?.annualSalary}</div>
          )}
        </div>

        <button>{action === "create" ? "SUBMIT" : "EDIT"}</button>
      </form>
    </div>
  );
}
