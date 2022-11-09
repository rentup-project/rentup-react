import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormProperty from '../../components/FormProperty/FormProperty';
import { updateProperty } from '../../services/Properties.services';
import './EditPropertyScreen.css';

export default function EditPropertyScreen() {
    const [mongoErr, setMongoErr] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const handleOnSubmit = (data) => {    
      updateProperty(id, data)
        .then((prop) => {
          navigate(`/property/${prop.id}`);
        })
        .catch((err) => {
            window.scrollTo(0, 0);
            err?.response?.data && setMongoErr(err.response.data.errors)
        });
    };

    return (
      <div className="edit-property-container">
        <h3>Edit your property</h3>
        <FormProperty
          mongoErr={mongoErr}
          propertyId={id}
          handleOnEdit={handleOnSubmit}
        />
      </div>
    );
}
