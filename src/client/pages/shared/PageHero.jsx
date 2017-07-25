import React from 'react';
import PropTypes from 'prop-types';

const PageHero = ({ bgImageClass, bgColorClass, bgUrl, title, children, full }) => (
  <div className={`${full ? 'page-hero--full' : 'page-hero'} relative`}>
    <div
      className={`page-hero__bg-image abs-center-stretch desaturate bg-cover ${bgImageClass}`}
      style={bgUrl !== '' ? { background: `url(${bgUrl})`, backgroundSize: 'cover' } : {}}
    />
    <div className={`page-hero__bg-overlay abs-center-stretch opacity-75 ${bgColorClass}`} />
    <div className="page-hero__banner relative">
      <div className="page-hero__container container relative height-100">
        <h1 className="page-hero__title c-white bold center uppercase abs-center">{title}</h1>
        {children}
      </div>
    </div>
  </div>
);

PageHero.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  bgImageClass: PropTypes.string.isRequired,
  bgColorClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  bgUrl: PropTypes.string,
  full: PropTypes.bool,
};

PageHero.defaultProps = {
  children: null,
  bgUrl: '',
  full: false,
};

export default PageHero;
