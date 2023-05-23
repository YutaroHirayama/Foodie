import "./reviewModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReviewThunk, getOneBusinessThunk } from "../../store/business";
import { editReviewThunk } from '../../store/session';
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import ReviewRatingStars from "./reviewStars";

const ReviewModal = ({business, user, review}) => {
  const { closeModal } = useModal();
  const history = useHistory();
  const dispatch = useDispatch();

  const [stars, setStars] = useState(review?.rating);
  const [reviewText, setReviewText] = useState(review?.review);
  const [image1, setImage1] = useState(review?.reviewImages[0]);
  const [image2, setImage2] = useState(review?.reviewImages[1]);
  const [image3, setImage3] = useState(review?.reviewImages[2]);

  const [errors, setErrors] = useState([]);


  const onChange = (number) => {
    setStars(parseInt(number));
  };

  const formSubmit = async (e) => {
    e.preventDefault();

    if(review) {

      const updatedReview = {
        reviewId: review.id,
        reviewText,
        rating: stars
      };

      const res = await dispatch(editReviewThunk(updatedReview))
      dispatch(getOneBusinessThunk(business.id))
      if(res?.errors) {
        setErrors(res.errors)
      } else {
        closeModal()
      }

    } else {

      const newReview = {
        businessId: business.id,
        reviewText,
        rating: stars,
        image1,
        image2,
        image3
      };

      const res = await dispatch(createReviewThunk(newReview))

      if(res?.errors) {
        setErrors(res.errors)
      } else {
        dispatch(getOneBusinessThunk(business.id))
        closeModal()
      }
    }

  }


  return (
    <div className='review-modal'>
      <form onSubmit={formSubmit}>
        <h2>{business?.name}</h2>
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
        <div className='review-images-container'>
          <label>Upload images for your review here.</label>
            <div className='review-image-input-container'>
              <input
                  className='review-image-input'
                  type='text'
                  value={image1}
                  onChange={(e) => setImage1(e.target.value)}
                  placeholder='Url'
                  />
              <input
                  className='review-image-input'
                  type='text'
                  value={image2}
                  onChange={(e) => setImage2(e.target.value)}
                  placeholder='Url'
                  />
              <input
                  className='review-image-input'
                  type='text'
                  value={image3}
                  onChange={(e) => setImage3(e.target.value)}
                  placeholder='Url'
                  />
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
