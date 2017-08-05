import React from 'react';
import PropTypes from 'prop-types';

const Contributors = ({ contributors }) => {
  return (
    <div className="results margin-vertical-big">
      <div className="flex flex-wrap margin-vertical-big justify-space-around">
        {contributors.map(aContributor =>
          <h4 key={aContributor.login}>{aContributor.login}</h4>,
        )}
      </div>
    </div>
  );
};

Contributors.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Contributors;
