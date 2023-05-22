import './review.css'


const Review = ({review}) => {

  const starRes = (rating) => {
    let stars = []
    for (let i = 1; i <= rating; i++) {
      stars.push(<i class="fa-solid fa-star"></i>)
    }
    return stars
  }

  const reviewImages = (images) => {

  }

  return (
    <div className='single-review'>
      <div className='single-review-reviewer'>
        <img className='single-review-profile-pic' src={review.user.profilePic} />
        <div className='single-review-name'>{review.user.firstName} {review.user.lastName[0]}.</div>
      </div>
      <div className='single-review-rating'>
        {starRes(review.rating)}
        <span className='single-review-date'>{' '}{review.createdAt}</span>
      </div>
      <div className='single-review-text'>
        <p>{review.review}</p>
      </div>
      <div className='single-review-photos'>
        {/* {reviewImages(review.)} */}
      </div>
    </div>
  )
}

export default Review;
