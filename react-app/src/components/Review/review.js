


const Review = ({review}) => {


  return (
    <div className='single-review'>
      <div className='single-review-reviewer'>
        <image src={review.user.profilePic} />
        <span>{review.user.firstName} {review.user.lastName[0]}.</span>
      </div>
      <div className='single-review-rating'>
        {review.rating}
      </div>
      <div className='single-review-text'>
        <p>{review.review}</p>
      </div>
      <div className='single-review-photos'>
      </div>
    </div>
  )
}

export default Review;
