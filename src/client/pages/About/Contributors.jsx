import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

const LoadingPlaceholder = () => (
  <div className="loading__placeholder home-img__loading-spinner loading-spinner border-round" />
);

const ContributorImage = ({ avatarURL }) => (
  <div>
    <LazyLoad height={250} once placeholder={<LoadingPlaceholder />}>
      <img className="border-round" src={avatarURL} alt="" height="75%" width="65%" />
    </LazyLoad>
  </div>
);

const ContributorName = ({ contributorName, contributorHTML }) => (
  <div className="flex-1 margin-left-tiny margin-top-small">
    <h2 className="c-secondary bold">
      <a href={contributorHTML} target="_blank" rel="noopener noreferrer">
        {contributorName} </a>
    </h2>
  </div>
);

const Contributors = ({ contributors }) => (
  <div className="container">
    {contributors.map(aContributor =>
      <section className="flex margin-top-huge">
        <ContributorImage avatarURL={aContributor.avatar} />
        <ContributorName contributorName={aContributor.login} contributorHTML={aContributor.html} />
      </section>,
    )}
  </div>
);

Contributors.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default Contributors;
