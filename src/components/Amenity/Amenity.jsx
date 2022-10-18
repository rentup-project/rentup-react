import React, { useEffect, useState } from "react";
import './Amenity.css';
/* SERVICES IMAGES */
import AirIcon from "../../assets/images/services-images/Air-icon.png";
import BalconyIcon from "../../assets/images/services-images/Balcony-icon.png";
import BoxRoomIcon from "../../assets/images/services-images/Boxroom-icon.png";
import CabinetsIcon from "../../assets/images/services-images/Cabinets-icon.png";
import GardenIcon from "../../assets/images/services-images/Garden-icon.png";
import GymIcon from "../../assets/images/services-images/Gym-icon.png";
import LyftIcon from "../../assets/images/services-images/Lyft-icon.png";
import ParkingIcon from "../../assets/images/services-images/Parking-icon.png";
import PatioIcon from "../../assets/images/services-images/Patio-icon.png";
import PlayGroundIcon from "../../assets/images/services-images/Playground-icon.png";
import PoolIcon from "../../assets/images/services-images/Pool-icon.png";
import SecurityIcon from "../../assets/images/services-images/Security-icon.png";
import SpaIcon from "../../assets/images/services-images/Spa-icon.png";
import TerraceIcon from "../../assets/images/services-images/Terrace-icon.png";

export default function Amenity({ feature }) {
    const [imageUrl, setImageUrl] = useState("");

    const setImgFeature = () => {
        if (feature === "Pool") {
          setImageUrl(PoolIcon);
        } else if (feature === "Air conditioning") {
          setImageUrl(AirIcon);
        } else if (feature === "Lyft") {
          setImageUrl(LyftIcon);
        } else if (feature === "Built-in cabinets") {
          setImageUrl(CabinetsIcon);
        } else if (feature === "Boxroom") {
          setImageUrl(BoxRoomIcon);
        } else if (feature === "Parking") {
          setImageUrl(ParkingIcon);
        } else if (feature === "Balcony") {
          setImageUrl(BalconyIcon);
        } else if (feature === "Terrace") {
          setImageUrl(TerraceIcon);
        } else if (feature === "Garden") {
          setImageUrl(GardenIcon);
        } else if (feature === "24-hour-security") {
          setImageUrl(SecurityIcon);
        } else if (feature === "Gym") {
          setImageUrl(GymIcon);
        } else if (feature === "Playground") {
          setImageUrl(PlayGroundIcon);
        } else if (feature === "Spa") {
          setImageUrl(SpaIcon);
        } else {
            setImageUrl(PatioIcon);
        }
    };

    useEffect(() => {
        setImgFeature()
    })

    return (
        <div className="amenities-wraper">
        <div
            className="feature-img"
            style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            }}
        ></div>
        <span key={feature}>{feature}</span>
        </div>
    );
}
