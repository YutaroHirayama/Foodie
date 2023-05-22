import './profilePage.css';
import OpenModalButton from '../OpenModalButton';
import CreateBusinessModal from '../CreateBusinessModal/createBusinessModal';
import BusinessCard from '../Results/businessCard';
import { Link } from 'react-router-dom';
import EditBusinessModal from '../EditBusinessModal/editBusinessModal';
import DeleteBusinessModal from '../DeleteBusinessModal/deleteBusinessModal';
import ReviewModal from '../ReviewModal/reviewModal';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { fetchReviewsThunk, fetchBusinessesThunk} from '../../store/session'
import Review from '../Review/review';
import DeleteReviewModal from '../DeleteReviewModal/deleteReviewModal';

const ProfilePage = () => {
  const user = useSelector(state => state.session.user)
  const reviews = useSelector(state => state.session.user?.reviews)
  const businessesOwned = useSelector(state => state.session.user?.businessesOwned)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReviewsThunk())
    dispatch(fetchBusinessesThunk())
  },[dispatch])

  if(!user) return null;

  return (
      <div className='profile-page'>
        <div className='profile-page-header'>
          <div>
            <img className='profile-page-pic' src={user.profilePic}></img>
          </div>
          <div className='profile-page-info'>
            <h2>{user.firstName} {user.lastName[0]}.</h2>
            <div className='profile-page-review-count'>{user.reviews.length} Reviews</div>
          </div>
        </div>
        <div className='profile-page-businesses'>
          <h2 className='profile-page-businesses-owned-header'>Manage your Businesses</h2>
          <div className='profile-page-create-business'>
            <OpenModalButton
              buttonText='Create a Business Page'
              className='create-business-button'
              modalComponent={<CreateBusinessModal user={user} />}
              />
          </div>
          <div className='profile-page-businesses-owned'>

            {businessesOwned && businessesOwned.map((business, idx) => (
              <div className='owned-business-card'>
                <BusinessCard key={idx} business={business} idx={idx+1} />
                <div className='owned-business-button-container'>
                  <OpenModalButton
                    buttonText='Edit'
                    className='owned-business-button'
                    modalComponent={<EditBusinessModal business={business} />}
                  />
                  <OpenModalButton
                    buttonText='Delete'
                    className='owned-business-button'
                    modalComponent={<DeleteBusinessModal business={business} />}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className='profile-page-reviews'>
            <h2>Manage your Reviews</h2>
              {reviews && reviews.map(review => (
                <div className='owned-review-cards'>
                  <h3 className='owned-review-business-name'>{review.business?.name}</h3>
                  <Review key={review.id} review={review} />
                  <div className='owned-business-button-container'>
                      <OpenModalButton
                        buttonText='Edit'
                        className='owned-review-button'
                        modalComponent={<ReviewModal review={review} business={review.business}/>}
                      />
                      <OpenModalButton
                        buttonText='Delete'
                        className='owned-review-button'
                        modalComponent={<DeleteReviewModal reviewId={review.id}/>}
                      />
                  </div>
                </div>
              ))}



          </div>
        </div>
      </div>
  )
}

export default ProfilePage;
