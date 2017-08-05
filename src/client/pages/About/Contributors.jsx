import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

const LoadingPlaceholder = () => (
  <div className="loading__placeholder home-img__loading-spinner loading-spinner border-round" />
);

const ContributorImage = ({ avatarURL }) => (
  <div>
    <LazyLoad height={350} once placeholder={<LoadingPlaceholder />}>
      <img className="border-round" src={avatarURL} alt="" />
    </LazyLoad>
  </div>
);

const Contributors = ({ contributors }) => {
  const left = 'l';
  const right = 'r';
  const horizontalPosition = right;

  return (
    <div className="container">
      {contributors.map(aContributor =>
        <section className="flex margin-top-huge">
          <ContributorImage avatarURL={aContributor.avatar} />
          <div className="flex-1 margin-left-small margin-top-small">
            <h1 className="c-secondary bold">
              <a href={aContributor.html} target="_blank" rel="noopener noreferrer">
                {aContributor.login} </a>
            </h1>
          </div>
        </section>,
      )}
    </div>
  );
};

Contributors.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Contributors;
