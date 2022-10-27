import React from 'react';
import FormProperty from '../../components/FormProperty/FormProperty';
import './EditPropertyScreen.css';
import { useParams } from 'react-router-dom';

export default function EditPropertyScreen() {
    const { id } = useParams();

    return (
        <div className='edit-property-container'>
            <h3>Edit your property</h3>
            <FormProperty propertyId={id} edit="true"/>
        </div>
    )
}
