import './profilePage.css';
import OpenModalButton from '../OpenModalButton';
import CreateBusinessModal from '../CreateBusinessModal/createBusinessModal';
import BusinessCard from '../Results/businessCard';
import { Link } from 'react-router-dom';
import EditBusinessModal from '../EditBusinessModal/editBusinessModal';
import DeleteBusinessModal from '../DeleteBusinessModal/deleteBusinessModal';
import { useSelector, useDispatch } from "react-redux";

const ProfilePage = () => {
  const user = useSelector(state => state.session.user)

  if(!user) return null;

  return (
      <div className='profile-page'>
        <div className='profile-page-header'>
          <div>
            <img className='profile-page-pic' src={user.profilePic}></img>
          </div>
          <div className='profile-page-info'>
            <h2>{user.firstName} {user.lastName[0]}.</h2>
          </div>
        </div>
        <div className='profile-page-businesses'>
          <div className='profile-page-businesses-owned-header'>Manage your Businesses</div>
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
        </div>
      </div>
  )
}

export default ProfilePage;
