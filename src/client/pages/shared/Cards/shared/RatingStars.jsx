import React from 'react';
import PropTypes from 'prop-types';

const RatingStars = ({ item }) => {
  const ratingStars = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < item.rating) {
      ratingStars.push(<i className="fa icon-star c-accent h4 margin-right-tiny" key={`rating${item.name}${i}`} />);
    } else {
      ratingStars.push(<i className="fa icon-star-o c-accent h4 margin-right-tiny" key={`rating${item.name}${i}`} />);
    }
  }
  return (
    <div className="flex-1 no-margin">
      {ratingStars}
    </div>
  );
};

RatingStars.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default RatingStars;
