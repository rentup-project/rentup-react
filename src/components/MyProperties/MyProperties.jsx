import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "../../assets/images/Edit-icon.png";
import TrashIcon from "../../assets/images/Trash-icon.png";
import AuthContext from "../../contexts/AuthContext";
import {
  deleteProperty,
  getOwnerProperties
} from "../../services/Properties.services";
import PropertyCard from "../PropertyCard/PropertyCard";
import "./MyProperties.css";
import ghostImage from '../../assets/images/ghost-image.png'

export default function MyProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState('');
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser){
      setLoading(true);

      getOwnerProperties(currentUser.id)
        .then((res) => {
          if(res) {
            setProperties(res);
            setLoading(false);
          }
        }) 
        .catch((err) => navigate("/error"));
    }
  }, [navigate, currentUser]);

  const handleOnEdit = (id) => {
    navigate(`/property/edit/${id}`);
  };

  const handleOnDelete = (id) => {
    deleteProperty(id)
      .then((propDeleted) => {
        setProperties(properties.filter((prop) => prop.id !== propDeleted.id));
      })
      .catch((err) => navigate("/error"));
  };

  return (
    <div className="my-properties-container">
      {loading && (
        <div className="spinner-container">
          <span className="loader"></span>
        </div>
      )}

      {!loading && properties.length > 0 && (
        <div className="my-properties-wrapper">
          {properties.map((prop) => (
            <div className="my-property-wrapper" key={prop.id}>
              <PropertyCard
                images={prop.images}
                address={prop.address}
                bedroom={prop.bedroom}
                bathroom={prop.bathroom}
                id={prop.id}
                squaredMeters={prop.squaredMeters}
                lat={prop.lat}
                long={prop.long}
                price={prop.monthlyRent}
                availability={prop.availabilityDate}
              />
              <div className="delete-edit-icons-wrapper">
                <div
                  onClick={() => handleOnEdit(prop.id)}
                  className="edit-img"
                  style={{
                    backgroundImage: `url(${EditIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  onClick={() => handleOnDelete(prop.id)}
                  className="trash-img"
                  style={{
                    backgroundImage: `url(${TrashIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!loading && properties.length === 0 && (
        <div className="no-content-div">
          <h4>You have no properties available.</h4>
          <img src={ghostImage} alt="ghost" />
        </div>
      )}
    </div>
  );
}
