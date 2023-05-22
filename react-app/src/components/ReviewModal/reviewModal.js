import "./reviewModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/business";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import ReviewRatingStars from "./reviewStars";

const ReviewModal = ({business, user}) => {
  const [stars, setStars] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const onChange = (number) => {
    setStars(parseInt(number));
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    const newReview = {
      businessId: business.id,
      reviewText,
      rating: stars
    };

    const res = await dispatch(createReviewThunk(newReview))
    if(res?.errors) {
      setErrors(res.errors)
    } else {
      closeModal()
    }
  }


  return (
    <div className='review-modal'>
      <form onSubmit={formSubmit}>
        <h2>{business.name}</h2>
        <ul>
          {errors.map((error, idx) => (
            <li className='form-errors' key={idx}>{error}</li>
          ))}
        </ul>
        <div className='review-modal-review-container'>
          <div className='review-modal-rating'>
            <ReviewRatingStars stars={stars} onChange={onChange}/>
          </div>
          <div className='review-modal-review'>
            <label>
              <textarea
                className='review-modal-input'
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                placeholder='Write your review here.'
                />
            </label>
          </div>
        </div>
        <div className="review-modal-submit">
            <button className="review-modal-submit-button">Post Review</button>
        </div>
      </form>
    </div>
  )
}

export default ReviewModal;
