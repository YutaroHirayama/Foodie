import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneBusinessThunk } from '../../store/business';
import { useEffect } from 'react';
import Review from '../Review/review';
import OpenModalButton from '../OpenModalButton';
import ReviewModal from '../ReviewModal/reviewModal';

const BusinessPage = ({user}) => {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const business = useSelector(state => state.business?.currentBusiness)

  useEffect(() => {
    dispatch(getOneBusinessThunk(businessId))
  }, [dispatch, businessId]);

  if(!Object.values(business).length) return null;

  return (

      <div className='business-page'>
        <div className='business-page-header'>
          <div className='business-page-details-container'>
            <div className='business-page-name'>
              <h1>{business.name}</h1>
            </div>
            <div className='business-page-rating'>

            </div>
            <div className='business-page-price-categories'>
              <span>Claimed ·</span>
              <span> {business.price} ·</span>
              <span> {business.category}</span>
            </div>
          </div>
        </div>
        <div className='business-page-create-review'>
          {user && (
            <OpenModalButton
                  buttonText='Write a Review'
                  className='create-review-button'
                  modalComponent={<CreateReviewModal business={business} user={user} />}
                  />
          )}
        </div>
        <div className='business-page-body'>
          <div className='business-page-scroll'>
            <div>Hours</div>
            <div className='business-page-about-container'>
              <h2>About the Business</h2>
              <div className='business-page-owner'>
                <h3>{business.owner.firstName} {business.owner.lastName[0]}.</h3>
                <div>Business Owner</div>
              </div>
              <div className='business-page-description'>{business.description}</div>
            </div>
            <div className='business-page-reviews-container'>
              <h2>All Reviews</h2>
              {business.reviews.length === 0 && (
                <h3>Be the first to review this business!</h3>
              )}
              {business.reviews && business.reviews.map(review => <Review key={review.id} review={review}/>)}
            </div>

          </div>
          <div className='business-page-lock'>

          </div>
        </div>
      </div>
  )
}

export default BusinessPage;
