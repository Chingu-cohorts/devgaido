import React from 'react';
import PropTypes from 'prop-types';

const Contributors = ({ contributors }) => {
  return (
    <div className="results margin-vertical-big">
      <div className="flex flex-wrap margin-vertical-big justify-space-around">
        {console.log(`contributors: ${contributors}`)}
        {contributors.forEach((contributor) => {
          return
            <h3>{contributor}</h3>;
        })}
      </div>
    </div>
  );
};

Contributors.propTypes = {
  contributors: PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default Contributors;

