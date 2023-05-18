import './businessCard.css';
import { Link } from 'react-router-dom'

const BusinessCard = ({business}) => {

  return (
    <Link>
      <div className='business-card'>
        <div className='business-card-image-container'>
          <img src={business.mainImage[0]} className='business-card-image'/>
        </div>
        <div className='business-card-details'>
          <div className='business-card-header'>
            <div className='business-card-name'>
              <h2>{business.name}</h2>
            </div>
            <div className='business-card-rating'>

            </div>
            <div className='business-card-category-price-location'>
              <span>{business.category} </span>
              <span> {business.price} · </span>
              <span> {business.city}</span>
            </div>
            <div className='business-card-review'>
              {business.reviews[0]?.review}
            </div>
          </div>
          <div className='results-grid'>

          </div>


        </div>
        <div className='results-map'>
          </div>
      </div>
    </Link>
  )
}

export default BusinessCard;
