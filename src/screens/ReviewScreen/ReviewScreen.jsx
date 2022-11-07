import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import AuthContext from "../../contexts/AuthContext";
import { createReview } from "./../../services/MyArea.services";
import "./ReviewScreen.css";

export default function ReviewScreen() {
  const [mongoErr, setMongoErr] = useState("");
  const [score, setScore] = useState('');
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleScore = (rate) => {
    setScore(rate);
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setComment(value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = {
      user: currentUser.id,
      property: id,
      score,
      comment,
    };

    createReview(formData)
      .then((res) => navigate('/my-area/myRents'))
      .catch(
        (err) => err?.response?.data && setMongoErr(err.response.data.errors)
      );
  };

  return (
    <div id="review-container">
      <h3>We appreciate your review!</h3>
      <h6>
        Your review will help us to improve our web hosting quality products,
        and customer services.
      </h6>
      <form onSubmit={handleOnSubmit} className="form-rating">
        <div>
          <Rating
            onClick={handleScore}
            ratingValue={score}
            size={28}
            label
            transition
            fillColor="orange"
            emptyColor="gray"
          />
          {mongoErr?.score && (
            <div className="error-feedback">{mongoErr?.score}</div>
          )}
        </div>
        <div>
          <textarea
            onChange={handleOnChange}
            name="comment"
            rows="6"
            cols="50"
            className={`form-control ${mongoErr?.comment ? "is-invalid" : ""}`}
          ></textarea>
          {mongoErr?.comment && (
            <div className="error-feedback">{mongoErr?.comment}</div>
          )}
        </div>
        <button>SEND</button>
      </form>
    </div>
  );
}
