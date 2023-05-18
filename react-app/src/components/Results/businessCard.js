import './businessCard.css';

const BusinessCard = ({business}) => {

  return (

      <div className='business-card'>
        <div className='business-card-image-container'>
          <img></img>
        </div>
        <div className='business-card-details'>
          <div className='results-page-header'>
            <h2>Business</h2>
          </div>
          <div className='results-grid'>

          </div>


        </div>
        <div className='results-map'>
          </div>
      </div>
  )
}

export default BusinessCard;
