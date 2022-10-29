import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "../../assets/images/Edit-icon.png";
import TrashIcon from "../../assets/images/Trash-icon.png";
import PropertyCard from "../PropertyCard/PropertyCard";
import {
  deleteProperty,
  getOwnerProperties,
} from "../../services/Properties.services";
import "./MyPropertiesScreen.css";

export default function MyPropertiesScreen() {
  const [properties, setproperties] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getOwnerProperties(id)
      .then((res) => (res ? setproperties(res) : setproperties("")))
      .catch((err) => navigate("/error"));
  }, [id, navigate]);

  const handleOnEdit = (id) => {
    navigate(`/property/edit/${id}`);
  };

  const handleOnDelete = (id) => {
    deleteProperty(id)
      .then((propDeleted) => {
        setproperties(properties.filter((prop) => prop.id !== propDeleted.id));
      })
      .catch((err) => navigate("/error"));
  };

  return (
    properties && (
      <div className="my-properties-container">
        <h3>My properties:</h3>
        <div className="my-properties-wrapper">
          {properties.map((prop) => (
            <div className="my-property-wrapper" key={prop.id}>
              <PropertyCard
                images={prop.image}
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
                  className="calendar-img"
                  style={{
                    backgroundImage: `url(${EditIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <div
                  onClick={() => handleOnDelete(prop.id)}
                  className="calendar-img"
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
      </div>
    )
  );
}
