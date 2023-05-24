import './landingPage.css';

const LandingPage = ({ isLoaded }) => {
  return (
      <div className='landing-page'>
        <div className='landing-page-banner'>
          <img className='splash-image' src='./splashImage.jpeg'/>
          <div className='landing-page-welcome'>
            <h1 className='landing-page-title'> foodie </h1>
            <h3></h3>
          </div>
        </div>
      </div>
  )
}

export default LandingPage;
