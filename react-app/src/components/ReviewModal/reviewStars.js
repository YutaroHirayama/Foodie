import { useEffect, useState } from 'react';

const ReviewRatingStars = ({stars, onChange}) => {
  const [rating, setRating] = useState(stars);

  useEffect(() => {
    setRating(stars);
  }, [stars])

  const starsIcon = (number) => {
    const props = {};
      props.onMouseEnter = () => setRating(number);
      props.onMouseLeave = () => setRating(stars);
      props.onClick = () => onChange(number);
    return (
      <div
        key={number}
        className={rating >= number ? "fa fa-star rating-icon" : "fa fa-star-o rating-icon"}
        {...props}
      >
        <i className='star'></i>
      </div>
    );
  };

  return (
    <div className="reviewRating-input">
      {[1, 2, 3, 4, 5].map((number) => starsIcon(number))}
    </div>
  );
};

export default ReviewRatingStars;
