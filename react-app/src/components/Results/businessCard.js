import './businessCard.css';
import { NavLink } from 'react-router-dom'
import EditBusinessModal from '../EditBusinessModal/editBusinessModal';
import DeleteBusinessModal from '../DeleteBusinessModal/deleteBusinessModal';
import OpenModalButton from '../OpenModalButton';
import RemoveBookmarkModal from '../RemoveBookmarkModal/removeBookmarkModal';

const BusinessCard = ({business, idx, type}) => {

  const starRes = (rating) => {

    let stars = []
    for (let i = 1; i <= 5; i++) {
      if(i - rating === 0.5) stars.push(<div className={`half-star-card half-star-${Math.floor(rating)}-card`}><i className='fa-solid fa-star white-star'/></div>)
      else if(i <= rating) stars.push(<div className={`filled-star-card filled-star-${Math.floor(rating)}`}><i className='fa-solid fa-star white-star'/></div>)
      else stars.push(<div className='empty-star-card'><i className="fa-solid fa-star white-star"/></div>)
    }
    return stars
  }

  return (
    <>
      <NavLink to={`/business/${business.id}`} className='business-card-link'>
        <div className='business-card-container'>
          <div className='business-card'>
            <div className='business-card-image-container'>
              <img src={business.businessImages[0] || './defaultBusiness.jpg'}
                className='business-card-image'
                onError={e => {e.currentTarget.src='/defaultBusiness.jpg'}}
                />
            </div>
            <div className='business-card-details'>
              <div className='business-card-header'>
                <div className='business-card-name'>{idx}. {business.name}</div>
                <div className='business-card-rating'>
                  {!business.reviews.length > 0 && <span>New Business</span>}
                  <div className='business-card-stars'>
                    {business.rating && starRes(business.rating)}
                  </div>
                  {business.rating && (
                    <span className='business-review-count'>{business.reviews.length}</span>)}
                </div>
                <div className='business-card-category-price-location'>
                  {business.category && (<><span className='business-card-category'>{business.category}</span><span> · </span></>)}
                  <span> {business.price} · </span>
                  <span> {business.city}</span>
                </div>

                <div className='business-card-review-container'>
                  {business.reviews[0]?.review && <i className="fa-regular fa-comment comment-icon"></i>}
                  {business.reviews[0]?.review.length < 300 && `"${business.reviews[0]?.review}"`}
                  {business.reviews[0]?.review.length > 300 && (
                  <div>
                    "{business.reviews[0]?.review.slice(0,300)}..." <span className='more-link'> more</span>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
          {type === 'private' && (
            <div className='owned-button-container'>
              <OpenModalButton
                buttonText='Edit'
                className='foodie-small-button'
                icon="fa-regular fa-building"
                modalComponent={<EditBusinessModal business={business} />}
                />
              <OpenModalButton
                buttonText='Delete'
                className='foodie-small-button'
                icon="fa-regular fa-trash-can"
                modalComponent={<DeleteBusinessModal business={business} />}
                />
            </div>
          )}
          {type === 'bookmark' && (
            <div className='owned-button-container'>
              <OpenModalButton
                buttonText='Remove'
                className='foodie-small-button'
                icon="fa-regular fa-trash-can"
                modalComponent={<RemoveBookmarkModal bookmark={business} />}
                />
            </div>
          )}
        </div>
      </NavLink>
    </>
  )
}

export default BusinessCard;
