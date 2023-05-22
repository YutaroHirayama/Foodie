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
        className={rating >= number ? "fa fa-star" : "fa fa-star-o"}
        {...props}
      >
        <i className='star'></i>
      </div>
    );
  };

  return (
    <div className="reviewRating-input">
      {[1, 2, 3, 4, 5].map((number) => starsIcon(number))}
      <span> Stars </span>
    </div>
  );
};

export default ReviewRatingStars;
