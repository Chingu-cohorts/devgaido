import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

const LoadingPlaceholder = () => (
  <div className="loading__placeholder home-img__loading-spinner loading-spinner border-round" />
);

const ContributorImage = ({ avatarURL, imageAlignment }) => (
  <div className={imageAlignment}>
    <LazyLoad height={250} once placeholder={<LoadingPlaceholder />}>
      <div style={{ backgroundImage: `url(${avatarURL})`, width: '300px', height: '300px', backgroundSize: '300px', borderRadius: '150px'}} />
    </LazyLoad>
  </div>
);

const ContributorName = ({ contributorName, contributorHTML, nameAlignment, nameStyle }) => (
  <div className={nameAlignment} >
    <h2 className="no-margin">
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
        <div key={aContributor.login}>
          <section className="flex margin-top-tiny align-items-center">
            <ContributorImage avatarURL={aContributor.avatar} imageAlignment={'border-round margin-left-huge'} />
            <ContributorName
              contributorName={aContributor.login}
              contributorHTML={aContributor.html}
              nameAlignment={'flex-1 margin-top-tiny margin-left-small'}
              nameStyle={'c-primary bold'}
            />
          </section>
        </div>
      );
    }
    lastPosition = right;
    return (
      <div key={aContributor.login}>
        <section className="flex margin-top-tiny align-items-center">
          <ContributorName
            contributorName={aContributor.login}
            contributorHTML={aContributor.html}
            nameAlignment={'flex-1 margin-top-tiny margin-right-small right'}
            nameStyle={'c-secondary bold'}
          />
          <ContributorImage avatarURL={aContributor.avatar} imageAlignment={'border-round margin-right-huge'} />
        </section>
      </div>
    );
  });
  return (
    <div className="container margin-top-huge margin-bottom-huge">
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
