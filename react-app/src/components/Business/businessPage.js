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
    const half = rating % Math.floor(rating)
    let stars = []
    for (let i = 1; i <= Math.floor(rating); i++) {
      stars.push(<i class="fa-solid fa-star"></i>)
    }
    if(half) stars.push(<i class="fa-solid fa-star-half-stroke"></i>)
    console.log(stars)
    return stars
  }

  const businessBanner = (images) => {
    const bannerImages = []
    console.log('images', images)
    for (let i = 0; i < images.length; i++) {
      let bannerImage = images[i]
      bannerImages.push(<img className='business-page-banner-image' src={bannerImage} />)
    }
    return bannerImages
  }

  if(!Object.values(business).length) return null;

  return (

      <div className='business-page'>
        <div className='business-page-banner'>
          {businessBanner(business.businessImages)}
        </div>
        <div className='business-page-details'>
          <div className='business-page-header'>
            <div className='business-page-header-details'>
              <div className='business-page-name'>
                <h1>{business.name}</h1>
              </div>
              <div className='business-page-rating'>
                <div className='business-page-stars'>
                  {starRes(business.rating)}
                </div>
                <div className='business-page-review-count'>{business.reviews.length} Reviews</div>
              </div>
              <div className='business-page-price-categories'>
                <span>Claimed ·</span>
                <span> {business.price} ·</span>
                <span> {business.category}</span>
              </div>
            </div>
          </div>

          <div className='business-page-body'>
            <div>
              <div className='business-page-create-review'>
                {user && (
                  <OpenModalButton
                        buttonText='Write a Review'
                        className='create-review-button'
                        modalComponent={<ReviewModal business={business} user={user} />}
                        />
                )}
              </div>
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

              <div className='business-page-lock'></div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default BusinessPage;
