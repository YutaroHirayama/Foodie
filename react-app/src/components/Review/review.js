import './review.css'


const Review = ({review}) => {

  const starRes = (rating) => {

    let stars = []
    for (let i = 1; i <= 5; i++) {
      if(i <= rating) stars.push(<div className={`filled-star-card filled-star-${Math.floor(rating)}`}><i className='fa-solid fa-star white-star'/></div>)
      else stars.push(<div className='empty-star-card'><i className="fa-solid fa-star white-star"/></div>)
    }
    return stars
  }



  return (
    <div className='single-review'>
      <div className='single-review-reviewer'>
        <img className='single-review-profile-pic' src={review.user?.profilePic} />
        <div className='single-review-name'>{review.user?.firstName} {review.user?.lastName[0]}.</div>
      </div>
      <div className='single-review-rating'>
        {starRes(review.rating)}
        <span className='single-review-date'>{' '}{review.createdAt}</span>
      </div>
      <div className='single-review-text'>
        {review.review}
      </div>
      <div className='single-review-images-container'>
        {review.reviewImages && review.reviewImages.map(image => (
          <img className='single-review-image' src={image} />
        ))
        }
      </div>
    </div>
  )
}

export default Review;
