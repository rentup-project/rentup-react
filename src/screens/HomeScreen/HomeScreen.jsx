import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddressAutofill, config } from "@mapbox/search-js-react";
import "./HomeScreen.css";
import HomeCard from "../../components/HomeCard/HomeCard";
import cards from "../../data/homecards.json";
/* IMAGES */
import SearchLogo from "../../assets/images/SearchIcon.png";
import ImgMockup from "../../assets/images/HouseMockup.jpg";
import StarYellow from '../../assets/images/Star_yellow.png'

export default function HomeScreen() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate();
  const [token, setToken] = useState("");

  useEffect(() => {
    const accessToken =
      "pk.eyJ1IjoibmluYWxib25pIiwiYSI6ImNsOWNuYXppYjBrNmYzcG9laHA3MTN3bTQifQ.90TcbIeqC9bJYExbkEto4Q";
    setToken(accessToken);
    config.accessToken = accessToken;
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

      <section className="last-properties">
        <h2>Last properties posted</h2>
        <div className="properties-container">
          <div className="property-container">
            <img src={ImgMockup} alt="img-mockup"></img>
            <h4>Lorem ipsum</h4>
            <h5>$500</h5>
            <div className="property-detail">
              <small>Calle XXX, City</small>
              <small>XXm2 • XX Habitaciones • XX Baños</small>
            </div>
          </div>
          <div className="property-container">
            <img src={ImgMockup} alt="img-mockup"></img>
            <h4>Lorem ipsum</h4>
            <h5>$500</h5>
            <div className="property-detail">
              <small>Calle XXX, City</small>
              <small>XXm2 • XX Habitaciones • XX Baños</small>
            </div>
          </div>
          <div className="property-container">
            <img src={ImgMockup} alt="img-mockup"></img>
            <h4>Lorem ipsum</h4>
            <h5>$500</h5>
            <div className="property-detail">
              <small>Calle XXX, City</small>
              <small>XXm2 • XX Habitaciones • XX Baños</small>
            </div>
          </div>
        </div>
      </section>

      <section className="rentup-advantages">
        <h1>EASY</h1>
        <div className="scroller">
          <span>
            SEARCH
            <br />
            VISITS
            <br />
            CONTRACTS
            <br />
            PAYMENTS
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
    </div>
  );
}