import './profilePage.css';
import OpenModalButton from '../OpenModalButton';
import CreateBusinessModal from '../CreateBusinessModal/createBusinessModal';
import BusinessCard from '../Results/businessCard';
import { Link } from 'react-router-dom'

const ProfilePage = ({user}) => {


  return (
      <div className='profile-page'>
        <div className='profile-page-header'>
          <div>
            <img className='profile-pic-msg' src={user.profilePic}></img>
          </div>
          <div className='profile-page-info'>
            <h2>{user.firstName} {user.lastName[0]}.</h2>
          </div>
        </div>
        <div className='profile-page-businesses'>
          <div className='profile-page-create-business'>
            <OpenModalButton
              buttonText='Create a Business Page'
              className='create-business-button'
              modalComponent={<CreateBusinessModal user={user} />}
              />
          </div>
          <div className='profile-page-businesses-owned'>
            {user.businessesOwned && user.businessesOwned.map((business, idx) => (
              <div className='owned-business-card'>
                <BusinessCard key={idx} business={business} idx={idx+1} />
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default ProfilePage;
