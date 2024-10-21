import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

const RatingComponent = ({ ratingCount }) => {
  // Check if ratingCount is undefined or null and provide a default value
  const validRatingCount = ratingCount || {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0
  };

  // Calculate the total number of ratings
  const totalRatings = Object.values(validRatingCount).reduce((acc, count) => acc + count, 0);

  return (
    <div className="col-md-6">
      {Object.keys(validRatingCount).reverse().map((rating) => {
        const count = validRatingCount[rating];
        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0;
        return (
          <div key={rating} className="d-flex item-center py-1" style={{ fontWeight: '600' }}>
            {rating} star &nbsp;
            <ProgressBar
              variant="warning"
              now={percentage}
              style={{ width: '70%', height: '10px' }}
            />{" "}
            &nbsp; {percentage.toFixed(2)}%
          </div>
        );
      })}
    </div>
  );
};

export default RatingComponent;