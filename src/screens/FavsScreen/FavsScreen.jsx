import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import ghostImage from '../../assets/images/ghost-image.png';
import TrashIcon from "../../assets/images/Trash-icon.png";
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import AuthContext from "../../contexts/AuthContext";
import { deleteOneFav, getAllFavs } from './../../services/Account.services';
import './FavsScreen.css';

export default function FavsScreen() {
    const [favs, setFavs] = useState([]);
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (currentUser) {
            const userSend = currentUser.id;

            getAllFavs(userSend)
            .then((favsArr) => {
              console.log(favsArr)
                setFavs(favsArr);
            })
            .catch((err) => navigate("/error"));
        }
    }, [currentUser, navigate])

    const handleOnDelete = (id) => {
      deleteOneFav(id, currentUser.id)
        .then((favDeleted) => {
          setFavs(
            favs.filter((fav) => fav.id !== favDeleted.id)
          );
        })
        .catch((err) => navigate("/error"));
    };

    return (
      <div className="favs-container">
        {
          favs.length !== 0 ?
          <h3>Your favourites properties</h3>
          :
          <div className='no-content-div'>
              <h4>You have no favourites yet. Go find them!</h4>
              <img src={ghostImage} alt="ghost" />
          </div>
        }
        <div className="favs-wrapper">
          {favs.length !== 0 &&
            favs.map((fav) => (
              <div className="fav-wrapper" key={fav.id}>
                <PropertyCard
                  images={fav.property?.images}
                  address={fav.property?.address}
                  bedroom={fav.property?.bedroom}
                  bathroom={fav.property?.bathroom}
                  price={fav.property?.reservationPrice}
                  id={fav.property?.id}
                  squaredMeters={fav.property?.squaredMeters}
                  lat={fav.property?.lat}
                  long={fav.property?.long}
                />
                <div
                  onClick={() => handleOnDelete(fav.property?.id)}
                  className="trash-img"
                  style={{
                    backgroundImage: `url(${TrashIcon})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            ))}
        </div>
      </div>
    );
}
