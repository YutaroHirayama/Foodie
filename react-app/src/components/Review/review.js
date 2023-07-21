import './review.css';
import { NavLink } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal/reviewModal';
import DeleteReviewModal from '../DeleteReviewModal/deleteReviewModal';

const Review = ({review, type}) => {

  const starRes = (rating) => {

    let stars = []
    for (let i = 1; i <= 5; i++) {
      if(i <= rating) stars.push(<div className={`filled-star-card filled-star-${Math.floor(rating)}`}><i className='fa-solid fa-star white-star'/></div>)
      else stars.push(<div className='empty-star-card'><i className="fa-solid fa-star white-star"/></div>)
    }
    return stars
  }

  if(!review) return null;

  return (
    <div className='single-review'>
      {type === 'public' && (
        <div className='single-review-reviewer'>
          <img className='single-review-profile-pic' src={review.user?.profilePic} onError={e =>{e.currentTarget.src='/defaultUser.jpg'}}/>
          <div className='single-review-name'>{review.user?.firstName} {review.user?.lastName[0]}.</div>
        </div>
      )}
      {type === 'private' && (
        <NavLink to={`/business/${review?.businessId}`}>
          <div className='single-review-reviewer'>
              <img className='single-review-profile-pic' src={review.business?.businessImages[0] || '/defaultBusiness.jpg'} onError={e =>{e.currentTarget.src='/defaultBusiness.jpg'}}/>
              <div className='private-review-business-details'>
                <div className='single-review-name'>{review.business?.name}</div>
                <div className='private-review-location'>{review.business?.city}, {review.business?.state}</div>
              </div>
          </div>
        </NavLink>
      )}
      <div className='single-review-rating'>
        {starRes(review.rating)}
        <span className='single-review-date'>{' '}{review.createdAt}</span>
      </div>
      <div className='single-review-text'>
        {review.review}
      </div>
      <div className='single-review-images-container'>
        {review.reviewImages && review.reviewImages.map(image => (
          <img className='single-review-image' src={image.imageUrl} onError={e =>{e.currentTarget.src='/defaultReview.png'}}/>
        ))
        }
      </div>
      {type === 'private' && (
        <div className='owned-button-container'>
          <OpenModalButton
            buttonText='Edit'
            className='foodie-small-button'
            icon="fa-regular fa-pen-to-square"
            modalComponent={<ReviewModal review={review} business={review.business}/>}
          />
          <OpenModalButton
            buttonText='Delete'
            className='foodie-small-button'
            icon="fa-regular fa-trash-can"
            modalComponent={<DeleteReviewModal reviewId={review.id}/>}
          />
        </div>
      )}
    </div>
  )
}

export default Review;
