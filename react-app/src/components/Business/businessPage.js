import './businessPage.css'
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

  const starRes = (rating) => {

    let stars = []
    for (let i = 1; i <= 5; i++) {
      if(i - rating === 0.5) stars.push(<div className={`half-star half-star-${Math.floor(rating)}`}><i className='fa-solid fa-star white-star'/></div>)
      else if(i <= rating) stars.push(<div className={`filled-star filled-star-${Math.floor(rating)}`}><i className='fa-solid fa-star white-star'/></div>)
      else stars.push(<div className='empty-star'><i className="fa-solid fa-star white-star"/></div>)
    }
    return stars
  }


  const businessBanner = (images) => {
    const bannerImages = []
    for (let i = 0; i < images.length; i++) {
      bannerImages.push(
        <div className='business-page-banner-image-wrapper'>
          <img className='business-page-banner-image' src={images[i]} onError={e =>{e.currentTarget.src='/defaultBusiness.jpg'}}/>
        </div>
        )
    }
    return bannerImages
  }

  const reviewButton = () => {
    const existingReview = business?.reviews?.find(review => review.userId === user.id)
    if(!existingReview) {
      return (
        <OpenModalButton
        buttonText='Write a Review'
        className='foodie-big-button'
        icon='fa-regular fa-star'
        modalComponent={<ReviewModal business={business} user={user} />}
        />
      )
    } else {
      return (
        <OpenModalButton
        buttonText='Edit your Review'
        className='foodie-big-button'
        icon='fa-regular fa-pen-to-square'
        modalComponent={<ReviewModal business={business} user={user} review={existingReview}/>}
        />
      )
    }
  }

  if(!Object.values(business).length) return null;

  return (

      <div className='business-page'>
          {business.businessImages && business.businessImages.length > 0 && (
            <div className='business-page-banner'>
                {businessBanner(business.businessImages)}
            </div>
          )}
          {(!business.businessImages || business.businessImages.length === 0) && (
            <div className='business-page-banner'>
                {businessBanner(['/defaultBusiness.jpg', '/defaultBusiness.jpg'])}
            </div>
          )}
        <div className='business-page-details'>
          <div className='business-page-header'>
            <div className={`business-page-header-details`}>
              <div className='business-page-name'>{business.name}</div>
              <div className='business-page-rating'>
                <div className='business-page-stars'>
                  {business.rating ? starRes(business.rating) : 'New Business'}
                </div>
                <div className='business-page-review-count'>{business.reviews.length ? `${business.reviews.length} Reviews`: ''}</div>
              </div>
              <div className='business-page-price-categories'>
                <span className='business-claimed'>Claimed </span>
                <span>{' · '}</span>
                <span> {business.price} </span>
                {business.category && <span>· {business.category}</span>}
              </div>
            </div>
          </div>

          <div className='business-page-body-container'>
            <div className='business-page-body'>
              <div className='business-page-create-review'>
                {user && business.ownerId !== user.id && reviewButton()}
              </div>
              {/* <div>Hours</div> */}
              <div className='business-page-about-container'>
                <h2>About the Business</h2>
                <div className='business-page-owner-container'>
                  <div className='business-page-owner'>{business.owner.firstName} {business.owner.lastName[0]}.</div>
                  <div>Business Owner</div>
                </div>
                <div className='business-page-description'>{business.description}</div>
              </div>
              <div className='business-page-reviews-container'>
                <h2>All Reviews</h2>
                {business.reviews.length === 0 && (
                  <h3>Be the first to review this business!</h3>
                )}
                {business.reviews && business.reviews.map(review => <Review key={review.id} review={review} type='public'/>)}
              </div>
            </div>
            <div className='business-page-contact'>
              <div className='business-page-contact-item'>
                <div className='business-page-contact-text'>{`${business.address}, ${business.city}, ${business.state} ${business.zipcode}`}</div>
                <i className="fa-solid fa-diamond-turn-right contact-icon"/>
              </div>
              <div className='business-page-contact-item'>
                <div className='business-page-contact-text'>{business.website} </div>
                <i className="fa-regular fa-window-maximize contact-icon"/>
              </div>
              <div className='business-page-contact-item'>
                <div className='business-page-contact-text'>{`(${business.phoneNumber.slice(0,3)}) ${business.phoneNumber.slice(3,6)}- ${business.phoneNumber.slice(6)}`}</div>
                <i className="fa-solid fa-phone-volume contact-icon"/>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default BusinessPage;
