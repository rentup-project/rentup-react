import React, { useState, useCallback, useEffect } from "react";
import AddressAutofillForm from "../../components/AddressAutofillForm/AddressAutofillForm";
import './NewProperty.css';


export default function NewProperty() {
  
  return (
    <div className="new-property-container">
      <h3>Let's post your property!</h3>
      <form>


        
        <AddressAutofillForm />

      </form>
    </div>
  );
}
