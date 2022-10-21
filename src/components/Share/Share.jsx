import React from "react";
import './Share.css';
import {
  EmailShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from "react-share";

import {
  EmailIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon
} from "react-share";

import CloseBtnNav from "../../assets/images/CloseBtnNavbar.png";

export default function Share({ property, handleClick }) {
    const ShareURL = `http://localhost:3000/property/${property.id}`;

    return (
      <div className="Share-container">
        <img
          src={CloseBtnNav}
          alt="btn-close"
          className="close-share-options"
          onClick={handleClick}
        />
        <h3>Share this property on</h3>
        <div className="Share-prop-info">
          <img src={property.images[0]} alt="property-img" />
          <h6>{property.address}</h6>
        </div>
        <div className="Social-btn-container">
          <div className="Social-btn-wraper">
            <EmailShareButton className="Social-btn" url={ShareURL}>
              <EmailIcon size={32} borderRadius={10} />
              <span>Email</span>
            </EmailShareButton>
          </div>

          <div className="Social-btn-wraper">
            <WhatsappShareButton className="Social-btn" url={ShareURL}>
              <WhatsappIcon size={32} borderRadius={10} />
              <span>WhatsApp</span>
            </WhatsappShareButton>
          </div>

          <div className="Social-btn-wraper">
            <TelegramShareButton className="Social-btn" url={ShareURL}>
              <TelegramIcon size={32} borderRadius={10} />
              <span>Telegram</span>
            </TelegramShareButton>
          </div>

          <div className="Social-btn-wraper">
            <TwitterShareButton className="Social-btn" url={ShareURL}>
              <TwitterIcon size={32} borderRadius={10} />
              <span>Twitter</span>
            </TwitterShareButton>
          </div>
        </div>
      </div>
    );
}
