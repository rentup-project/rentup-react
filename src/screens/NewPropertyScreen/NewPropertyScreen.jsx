import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import FormProperty from "../../components/FormProperty/FormProperty";
import { createProperty } from './../../services/Properties.services';
import "./NewPropertyScreen.css";

export default function NewProperty() {
  const [mongoErr, setMongoErr] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (data) => {
      createProperty(data)
        .then((prop) => {
          navigate(`/property/${prop.id}`);
        })
        .catch((err) => err?.response?.data && setMongoErr(err.response.data.errors));
  };
  
  return (
    <div className="new-property-container">
      <h3>Let's post your property!</h3>
      <FormProperty 
      mongoErr={mongoErr} 
      handleOnCreate={handleOnSubmit} />
    </div>
  );
}
