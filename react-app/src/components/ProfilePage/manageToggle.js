import './profilePage.css';
import OpenModalButton from '../OpenModalButton';
import BusinessCard from '../Results/businessCard';

const togglePage = ({type}) => {

  if(type === 'businesses') {
    return (
      <div className='profile-page-businesses'>
        <h1 className='profile-page-businesses-owned-header'>Manage your Businesses</h1>
        <div className='profile-page-create-business'>
          <OpenModalButton
            buttonText='Create a Business Page'
            className='foodie-big-button'
            icon="fa-regular fa-building"
            modalComponent={<CreateBusinessModal user={user} />}
            />
        </div>
        <div className='profile-page-businesses-owned'>
          {businessesOwned && businessesOwned.map((business, idx) => (
            <div className='owned-business-card'>
              <BusinessCard key={idx} business={business} idx={idx+1} type='private'/>
            </div>
          ))}
        </div>
      </div>
    )
  } else if (type === 'reviews') {
    return (
      <div className='profile-page-reviews'>
        <h1>Manage your Reviews</h1>
        <div className='profile-page-reviews-grid'>
          {reviews && reviews.map(review => (
            <div className='single-owned-review-card'>
              <Review key={review.id} review={review} type='private'/>
            </div>
          ))}
          {!reviews.length && <h2>Start reviewing your favorite businesses!</h2>}
        </div>
      </div>
    )
  }
}
