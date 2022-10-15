import React, { useState } from 'react';
import HomeCard from '../../components/HomeCard/HomeCard';
import cards from '../../data/homecards.json';
import './HomeScreen.css';
import SearchLogo from '../../assets/images/SearchIcon.png';
import ImgMockup from '../../assets/images/HouseMockup.jpg';

export default function HomeScreen() {
   const [search, setSearch] = useState('')

   const handleChange = (e) => {
    const {value} = e.target
    setSearch(value)
  }

  return (
    <div className="HomeScreen">
      <div className="property-search">
        <form className="form-search-property" action="">
          <img src={SearchLogo} alt="logo-search"></img>
          <input
            placeholder="Search by your favourite location"
            value={search}
            id="city"
            name="city"
            onChange={handleChange}
          />
        </form>
      </div>

      <section className="last-properties">
        <h3>Last properties posted</h3>
        <div className="properties-container">
          <div>
            <img src={ImgMockup} alt="img-mockup"></img>
            <h4>Lorem ipsum</h4>
            <h5>$500</h5>
            <div className="property-detail">
              <small>Calle XXX, City</small>
              <small>XXm2 • XX Habitaciones • XX Baños</small>
            </div>
          </div>
          <div>
            <img src={ImgMockup} alt="img-mockup"></img>
            <h4>Lorem ipsum</h4>
            <h5>$500</h5>
            <div className="property-detail">
              <small>Calle XXX, City</small>
              <small>XXm2 • XX Habitaciones • XX Baños</small>
            </div>
          </div>
          <div>
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
        <div class="scroller">
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

      <section className="why-rentup">
        {cards.map((card) => (
          <HomeCard
            key={card.number}
            color={card.color}
            img_url={card.img_url}
            number={card.number}
            title={card.title}
            text={card.text}
          />
        ))}
      </section>
    </div>
  );
}
