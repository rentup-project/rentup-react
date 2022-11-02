import React, { useContext, useState } from 'react';
import AuthContext from '../../contexts/AuthContext';
import { completePrequalification } from '../../services/MyArea.services';
import './PrequalificationsForm.css';

export default function PrequalificationsForm({ edit, create }) {
    const [mongoErr, setMongoErr] = useState("");
    const [prequalification, setPrequalification] = useState({});
    const { currentUser } = useContext(AuthContext);

 /*    useEffect(() => {
        getPrequalification(currentUser.id)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },[currentUser]);
 */
    const handleOnChange = (e) => {
       const { name, value } = e.target;
       setPrequalification({...prequalification, [name]: value})
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if(currentUser) {
            setPrequalification({...prequalification, tenant: currentUser.id})
        }

        completePrequalification(prequalification)
        .then((res) => console.log(res))
        .catch(
            (err) =>
            err?.response?.data && setMongoErr(err.response.data.errors)
        );    
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
                defaultValue={prequalification.tenantsQuantity}
                name="tenantsQuantity"
                id="tenantsQuantity"
                onChange={handleOnChange}
                className={`form-control ${
                mongoErr.tenantsQuantity ? "is-invalid" : ""
                }`}
            ></input>
            {mongoErr.tenantsQuantity && (
                <div className="invalid-feedback">{mongoErr.tenantsQuantity}</div>
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
                className="form-select"
                aria-describedby="validationServer04Feedback"
                value={prequalification.hasPet}
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
            </div>

            <div>
            <label htmlFor="jobDuration" className="form-label">
                Job Duration
            </label>
            <select
                name="jobDuration"
                id="jobDuration"
                onChange={handleOnChange}
                className="form-select"
                aria-describedby="validationServer04Feedback"
                value={prequalification.jobDuration}
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
            </div>

            <div>
            <label htmlFor="annualSalary" className="form-label">
                Annual Salary
            </label>
            <input
                type="number"
                defaultValue={prequalification.annualSalary}
                name="annualSalary"
                id="annualSalary"
                onChange={handleOnChange}
                className={`form-control ${
                mongoErr.annualSalary ? "is-invalid" : ""
                }`}
            ></input>
            {mongoErr.annualSalary && (
                <div className="invalid-feedback">{mongoErr.annualSalary}</div>
            )}
            </div>

            <div>
            <label htmlFor="hasGuarantee" className="form-label">
                Guarantee
            </label>
            <select
                name="hasGuarantee"
                id="hasGuarantee"
                onChange={handleOnChange}
                className="form-select"
                aria-describedby="validationServer04Feedback"
                value={prequalification.hasGuarantee}
            >
                <option className="option-filter" name="selected" defaultValue>
                Select
                </option>
                <option className="option-filter" name="None">
                None
                </option>
                <option className="option-filter" name="1 month">
                1 month
                </option>
                <option className="option-filter" name="2 months">
                2 months
                </option>
            </select>
            </div>

            <button>{create ? "SUBMIT" : "EDIT"}</button>
        </form>
        </div>
    );
}
