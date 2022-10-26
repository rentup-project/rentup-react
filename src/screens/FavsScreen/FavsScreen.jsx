import React from 'react';
import './FavsScreen.css';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { getAllFavs } from './../../services/Account.services';
import PropertyList from '../../components/PropertyList/PropertyList';

export default function FavsScreen() {
    const [favs, setFavs] = useState();
    const navigate = useNavigate()
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (currentUser) {
            const userSend = currentUser.id;

            getAllFavs(userSend)
            .then((favsArr) => {
                setFavs(favsArr);
            })
            .catch((err) => navigate("/error"));
        }
    }, [currentUser, navigate])

    return (
        <div className="favs-container">
            <h3>Look your favourites properties:</h3>      
            {favs?.map((fav) => (
                <div
                key={fav.property.id}
                >
                    <PropertyList
                        images={fav.property.images}
                        address={fav.property.address}
                        bedroom={fav.property.bedroom}
                        bathroom={fav.property.bathroom}
                        id={fav.property.id}
                    />
                </div>
            ))}
        </div>
    );
}
