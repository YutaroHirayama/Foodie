import './profilePage.css';
import OpenModalButton from '../OpenModalButton';

const ProfilePage = ({user}) => {

  return (
      <div className='profile-page'>
        <div className='profile-page-header'>
          <div>
            <img className='profile-pic-msg' src={user.profilePic}></img>
          </div>
          <div className='profile-page-info'>
            <h2>{user.firstName}{user.lastName[0]}.</h2>
          </div>
        </div>
        <div className='profile-page-businesses'>
          <OpenModalButton
            buttonText='Create a Business Page'
            className='create-business-button'
            modalComponent={<CreateBusinessModal user={user} />}
            />
        </div>
      </div>
  )
}

export default ProfilePage;
