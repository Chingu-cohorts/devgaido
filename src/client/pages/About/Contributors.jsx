import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

const LoadingPlaceholder = () => (
  <div className="loading__placeholder home-img__loading-spinner loading-spinner border-round" />
);

const ContributorImage = ({ avatarURL, imageAlignment }) => (
  <div>
    <LazyLoad height={250} once placeholder={<LoadingPlaceholder />}>
      <img className={imageAlignment} src={avatarURL} alt="" height="80%" width="65%" />
    </LazyLoad>
  </div>
);

const ContributorName = ({ contributorName, contributorHTML, nameAlignment, nameStyle }) => (
  <div className={nameAlignment} >
    <h2>
      <a href={contributorHTML} target="_blank" rel="noopener noreferrer" className={nameStyle}>
        {contributorName} </a>
    </h2>
  </div>
);

const Contributors = ({ contributors }) => {
  const left = 'l';
  const right = 'r';
  let lastPosition = right;
  const contributorElement = contributors.map((aContributor) => {
    if (lastPosition === right) {
      lastPosition = left;
      return (
        <div key={aContributor.login} className="flex flex-wrap">
          <section className="flex">
            <ContributorImage avatarURL={aContributor.avatar} imageAlignment={'border-round'} />
            <ContributorName
              contributorName={aContributor.login}
              contributorHTML={aContributor.html}
              nameAlignment={'margin-left-tiny padding-left-small'}
              nameStyle={'c-primary bold'}
            />
          </section>
        </div>
      );
    }
    lastPosition = right;
    return (
      <div key={aContributor.login} className="flex flex-wrap">
        <section className="flex">
          <ContributorName
            contributorName={aContributor.login}
            contributorHTML={aContributor.html}
            nameAlignment={'margin-right-huge'}
            nameStyle={'c-secondary bold'}
          />
          <ContributorImage avatarURL={aContributor.avatar} imageAlignment={'border-round'} />
        </section>
      </div>
    );
  });
  return (
    <div className="container">
      {contributorElement}
    </div>
  );
};

Contributors.propTypes = {
  contributors: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

ContributorImage.propTypes = {
  avatarURL: PropTypes.string.isRequired,
  imageAlignment: PropTypes.string.isRequired,
};

ContributorName.propTypes = {
  contributorHTML: PropTypes.string.isRequired,
  contributorName: PropTypes.string.isRequired,
  nameAlignment: PropTypes.string.isRequired,
  nameStyle: PropTypes.string.isRequired,
};

export default Contributors;
