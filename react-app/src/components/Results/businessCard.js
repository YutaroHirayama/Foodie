import './businessCard.css';
import { NavLink } from 'react-router-dom'

const BusinessCard = ({business, idx}) => {

  const starRes = (rating) => {
    const half = business.rating % Math.floor(business.rating)
    let stars = []
    for (let i = 1; i <= Math.floor(business.rating); i++) {
      stars.push(<i className="fa-solid fa-star"></i>)
    }
    if(half) stars.push(<i className="fa-solid fa-star-half-stroke"></i>)

    return stars
  }

  return (
    <>
      <NavLink to={`/business/${business.id}`} className='business-card-link'>
        <div className='business-card-container'>
          <div className='business-card'>
            <div className='business-card-image-container'>
              <img src={business.mainImage[0]} className='business-card-image'/>
            </div>
            <div className='business-card-details'>
              <div className='business-card-header'>
                <div className='business-card-name'>{idx}. {business.name}</div>
                <div className='business-card-rating'>
                  {!business.rating && <span>New Business</span>}
                  <div className='business-card-stars'>
                    {business.rating && starRes(business.rating)}
                  </div>
                  {business.rating && (
                    <span className='business-review-count'>{business.reviews.length}</span>)}
                </div>
                <div className='business-card-category-price-location'>
                  <span>{business.category} ·</span>
                  <span> {business.price} · </span>
                  <span> {business.city}</span>
                </div>
                <div className='business-card-review'>
                  {business.reviews[0]?.review.slice(0,200)}
                  {business.reviews[0]?.review.length > 200 && <NavLink to={`/business/${business.id}`} className='more-link'> ...more</NavLink>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </>
  )
}

export default BusinessCard;
