import React from 'react';
import PropTypes from 'prop-types';

const Contributors = ({ contributors }) => {
  return (
    <div className="results margin-vertical-big">
      <div className="flex flex-wrap margin-vertical-big justify-space-around">
        {contributors.forEach((contributor) => {
          console.log(contributor);
        })}
      </div>
    </div>
  );
};

Contributors.propTypes = {
  contributors: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Contributors;

