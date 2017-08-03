import React from 'react';
import PropTypes from 'prop-types';

const Contributors = ({ contributors }) => (
  <div className="results margin-vertical-big">
    <div className="flex flex-wrap margin-vertical-big justify-space-around">
      {contributors.forEach((aContributor) => {
        console.log(`aContributor: ${aContributor}`);
        <h3>{ aContributor }</h3>;
      })}
    </div>
  </div>
);

Contributors.propTypes = {
  contributors: PropTypes.arrayOf(React.PropTypes.string).isRequired,
};

export default Contributors;

