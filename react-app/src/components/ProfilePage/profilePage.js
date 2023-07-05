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
import { fetchReviewsThunk, fetchBusinessesThunk, fetchBookmarksThunk} from '../../store/session'
import Review from '../Review/review';
import DeleteReviewModal from '../DeleteReviewModal/deleteReviewModal';

const ProfilePage = () => {
  const user = useSelector(state => state.session.user)
  const reviews = useSelector(state => state.session.user?.reviews)
  const businessesOwned = useSelector(state => state.session.user?.businessesOwned)
  const bookmarks = useSelector(state => state.session.user?.bookmarks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchReviewsThunk())
    dispatch(fetchBusinessesThunk())
    dispatch(fetchBookmarksThunk())
  },[dispatch])

  if(!user) return <h1>Log in or Sign up to view profile.</h1>;

  return (
      <div className='profile-page'>
        <div className='profile-page-header'>
          <div>
            <img className='profile-page-pic' src={user.profilePic} onError={e =>{e.currentTarget.src='/defaultUser.jpg'}}/>
          </div>
          <div className='profile-page-info'>
            <h1>{user.firstName} {user.lastName[0]}.</h1>
            <div className='profile-page-review-count'>{user.reviews.length === 1 ? `1 Review` : `${user.reviews.length} Reviews`}</div>
          </div>
        </div>
        <div className='profile-page-body'>
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
          <div className='profile-page-bookmarks'>
            <h1>Manage your Bookmarks</h1>
            <div className='profile-page-bookmark-grid'>
              {reviews && reviews.map(review => (
                <div className='single-owned-review-card'>
                  <Review key={review.id} review={review} type='private'/>
                </div>
              ))}
              {!reviews.length && <h2>Start reviewing your favorite businesses!</h2>}
            </div>
          </div>

        </div>
      </div>
  )
}

export default ProfilePage;
