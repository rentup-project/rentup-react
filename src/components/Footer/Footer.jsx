import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
/* IMAGES */
import LinkedinIcon from '../../assets/images/footer/Linkedin-icon.png';
import LocationIcon from '../../assets/images/footer/Location-icon.png';
import MailIcon from '../../assets/images/footer/Mail-icon.png';
import PhoneIcon from '../../assets/images/footer/Phone-icon.png';

export default function Footer() {
  return (
    <div id="footer-container">
      <div className="footer-section-wrapper">
        <h3>Developers</h3>
        <div className="contact-info-wrapper">
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/marina-laporte-boni-/" target="_blank">
              <div
                className="footer-img"
                style={{
                  backgroundImage: `url(${LinkedinIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </a>
          </div>
          <span className="name-developer">Marina Laporte Böni</span>
        </div>
        <div className="contact-info-wrapper">
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/marina-blason-graviz/" target="_blank">
              <div
                className="footer-img"
                style={{
                  backgroundImage: `url(${LinkedinIcon})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            </a>
          </div>
          <span className="name-developer">Marina Blasón Graviz</span>
        </div>
      </div>
      <div className="footer-section-wrapper">
        <h3>Contact</h3>
        <div className="contact-info-wrapper">
          <div
            className="footer-img"
            style={{
              backgroundImage: `url(${MailIcon})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <span>rentup.org@gmail.com</span>
        </div>
        <div className="contact-info-wrapper">
          <div
            className="footer-img"
            style={{
              backgroundImage: `url(${PhoneIcon})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <span>+34 622 222 222</span>
        </div>
        <div className="contact-info-wrapper">
          <div
            className="footer-img"
            style={{
              backgroundImage: `url(${LocationIcon})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <span>Madrid, Spain</span>
        </div>
      </div>
      <small id="copyright">© Copyright Rentup 2022</small>
    </div>
  );
}
