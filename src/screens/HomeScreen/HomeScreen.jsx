import { AddressAutofill, config } from "@mapbox/search-js-react";
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HomeCard from "../../components/HomeCard/HomeCard";
import cards from "../../data/homecards.json";
import "./HomeScreen.css";
/* IMAGES */
import SearchLogo from "../../assets/images/SearchIcon.png";
import StarYellow from '../../assets/images/Star_yellow.png';
import { getLastProperties } from './../../services/Properties.services';
import Footer from "../../components/Footer/Footer";

export default function HomeScreen() {
  const [lastProperties, setLastProperties] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const accessToken =
      "pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q";
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  useEffect(() => {
    getLastProperties()
    .then((props) => setLastProperties(props))
  }, []);

  const handleChange = (e) => {
    const {value} = e.target
    setSearch(value)
  }

  const handleSubmit = () => {
    if (search !== '') {
      navigate(`/search/${search}`)
    } else {
      navigate('/')
    }
  }

  const handleOnClick = () => {
    handleSubmit()
  }

  return (
    <div className="HomeScreen">
      <div className="property-search">
        <form
          className="form-search-property"
          action=""
          onSubmit={handleSubmit}
        >
          <button className="search-btn" onClick={handleOnClick}>
            <img src={SearchLogo} alt="logo-search" />
          </button>

          <AddressAutofill
            accessToken={token}
            options={{
              language: "en",
            }}
            width="500px"
          >
            <input
              placeholder="Search by your favourite location"
              value={search}
              onChange={handleChange}
              autoComplete="address-level1"
            />
          </AddressAutofill>
        </form>
      </div>

      {lastProperties.length !== 0 && (
        <section className="last-properties">
          <h2>Last properties posted</h2>
          <div className="home-properties-container">
            {lastProperties.map((prop) => (
              <div className="home-property-container">
                <img src={prop.images[0]} alt="property" width="340px" />
                <div>
                  <h4>{prop.address}</h4>
                  <h5>{prop.monthlyRent}€</h5>
                  <div className="home-property-detail">
                    <small>
                      {prop.squaredMeters}m2 • {prop.bedroom} bedroom •{" "}
                      {prop.bathroom} Baños
                    </small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rentup-advantages">
        <h1>EASY</h1>
        <div className="scroller">
          <span>
            SEARCH
            <br />
            VISIT
            <br />
            CONTRACT
            <br />
            PAYMENT
            <br />
          </span>
        </div>
      </section>

      <section className="rentup-services">
        {cards.map((card) => (
          <HomeCard
            key={card.number}
            color={card.color}
            img_url={card.img_url}
            number={card.number}
            position={card.position}
            left={card.left}
            title={card.title}
            text={card.text}
          />
        ))}
      </section>

      <section className="rentup-reviews">
        <h2>What clients say</h2>
        <div className="reviews-container">
          <div className="review-detail">
            <img
              className="rounded-circle shadow-1-strong mb-4"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp"
              alt="avatar"
              width="120px"
            />
            <div className="review-text">
              <h5>Maria Kate</h5>
              <div className="Star-wraper">
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
              </div>
              <p>
                ❝ Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                et deleniti nesciunt sint eligendi reprehenderit reiciendis,
                quibusdam illo. ❞
              </p>
            </div>
          </div>

          <div className="review-detail">
            <img
              className="rounded-circle shadow-1-strong mb-4"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp"
              alt="avatar"
              width="120px"
            />
            <div className="review-text">
              <h5>John Doe</h5>
              <div className="Star-wraper">
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
              </div>
              <p>
                ❝ Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                et deleniti nesciunt sint eligendi reprehenderit reiciendis,
                quibusdam illo. ❞
              </p>
            </div>
          </div>

          <div className="review-detail">
            <img
              className="rounded-circle shadow-1-strong mb-4"
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(1).webp"
              alt="avatar"
              width="120px"
            />
            <div className="review-text">
              <h5>Anna Deynah</h5>
              <div className="Star-wraper">
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
                <img src={StarYellow} alt="star-logo" />
              </div>
              <p>
                ❝ Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus
                et deleniti nesciunt sint eligendi reprehenderit reiciendis,
                quibusdam illo. ❞
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="footer">
        <Footer />
      </section>
    </div>
  );
}