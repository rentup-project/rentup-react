import React from "react";
import FormProperty from "../../components/FormProperty/FormProperty";
import "./NewProperty.css";

export default function NewProperty() {
  
  return (
    <div className="new-property-container">
      <h3>Let's post your property!</h3>
      <FormProperty create="true"/>      
    </div>
  );
}
