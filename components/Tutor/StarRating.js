import React from 'react';
import { FaStar, FaStarHalfAlt, FaStarO } from 'react-icons/fa';
import StarRatingComponent from 'react-star-rating-component';

const StarRating = ({ value }) => (
  <StarRatingComponent
    name="rating"
    starCount={5}
    value={value}
    renderStarIcon={(index, value) => {
      if (index <= Math.floor(value)) {
        return <FaStar key={index} />;
      } else if (index - value < 1) {
        return <FaStarHalfAlt key={index} />;
      } else {
        return <FaStarO key={index} />;
      }
    }}
    renderStarIconHalf={() => <FaStarHalfAlt />}
    editing={false} // Disables the ability to change the rating
  />
);

export default StarRating;
