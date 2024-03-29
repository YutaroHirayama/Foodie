import "./reviewModal.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createReviewThunk, getOneBusinessThunk } from "../../store/business";
import { editReviewThunk, deleteReviewImageThunk } from '../../store/session';
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

      const formData = await new FormData();

      formData.append('id', review.id)
      formData.append('reviewText', reviewText);
      formData.append('rating', stars);
      formData.append('image1', image1);
      formData.append('image2', image2);
      formData.append('image3', image3);

      const res = await dispatch(editReviewThunk(formData, review.id))
      dispatch(getOneBusinessThunk(business.id))
      if(res?.errors) {
        setErrors(res.errors)
      } else {
        closeModal()
      }

    } else {

      const formData = await new FormData();

      formData.append('reviewText', reviewText);
      formData.append('rating', stars);
      formData.append('image1', image1);
      formData.append('image2', image2);
      formData.append('image3', image3);

      const res = await dispatch(createReviewThunk(formData, business.id))

      if(res?.errors) {
        setErrors(res.errors)
      } else {
        dispatch(getOneBusinessThunk(business.id))
        closeModal()
      }
    }

  }

  const deleteImage = async (image, e) => {
    console.log(image)
    const res = await dispatch(deleteReviewImageThunk(image.id))
    if(res?.errors) {
      setErrors(res.errors)
    }
  }

  return (

    <div className='review-modal'>
      <form className='review-form' onSubmit={formSubmit}>
        <div className='review-form-title'>{business?.name}</div>
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
          <label>Upload images for your review here (Optional)</label>
            <div className='review-image-input-container'>
              {image1 && image1.type !== 'image/jpeg' && (
                <div className='business-image-loaded-container'>
                  <img className='business-image-loaded' src={image1.imageUrl}/>
                  <button
                    className='business-image-loaded-button'
                    type='button'
                    onClick={(e) => {deleteImage(image1, e); setImage1('')}}>
                      <i className="fa-regular fa-trash-can"/>
                  </button>
                </div>
              )}
              {(!image1 || image1.type === 'image/jpeg') && (
                <input
                  className='business-image-input'
                  type='file'
                  accept='image/*'
                  onChange={(e) => setImage1(e.target.files[0])}
                  placeholder='Main Image Url'
                />
              )}
                            {image2 && image2.type !== 'image/jpeg' && (
                <div className='business-image-loaded-container'>
                  <img className='business-image-loaded' src={image2.imageUrl}/>
                  <button
                    className='business-image-loaded-button'
                    type='button'
                    onClick={(e) => {deleteImage(image2, e); setImage2('')}}>
                      <i className="fa-regular fa-trash-can"/>
                  </button>
                </div>
              )}
              {(!image2 || image2.type === 'image/jpeg') && (
                <input
                  className='business-image-input'
                  type='file'
                  accept='image/*'
                  onChange={(e) => setImage2(e.target.files[0])}
                  placeholder='Url'
                />
              )}
              {image3 && image3.type !== 'image/jpeg' && (
                <div className='business-image-loaded-container'>
                  <img className='business-image-loaded' src={image3.imageUrl}/>
                  <button
                    className='business-image-loaded-button'
                    type='button'
                    onClick={(e) => {deleteImage(image3, e); setImage3('')}}>
                      <i className="fa-regular fa-trash-can"/>
                  </button>
                </div>
              )}
              {(!image3 || image3.type === 'image/jpeg') && (
                <input
                  className='business-image-input'
                  type='file'
                  accept='image/*'
                  onChange={(e) => setImage3(e.target.files[0])}
                  placeholder='Url'
                />
              )}
              {/* <input
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
                  /> */}
            </div>
        </div>
        <div className="review-modal-submit">
            <button className="review-modal-submit-button">{review ? 'Update Review':'Post Review'}</button>
        </div>
      </form>
    </div>

  )
}

export default ReviewModal;
