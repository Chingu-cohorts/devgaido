import React from 'react';
import PropTypes from 'prop-types';

const PageHero = ({ bgColorClass, bgUrl, title, subtitle, children, full }) => (
  <div className={`${full ? 'page-hero--full' : 'page-hero'} relative`}>
    <div
      className={`page-hero__bg-image abs-center-stretch desaturate bg-cover`}
      style={bgUrl !== '' ? { background: `url(${bgUrl})`, backgroundSize: 'cover' } : {}}
    />
    <div className={`page-hero__bg-overlay abs-center-stretch opacity-75 ${bgColorClass}`} />
    <div className="page-hero__banner relative">
      <div className="page-hero__container container relative height-100">
        <span className="page-hero__title c-white center uppercase abs-center width-75">
          <h4 className="bold no-margin">{subtitle}</h4>
          <h1 className="h2-d1 h3-t wide no-margin">{title}</h1>
        </span>
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
  bgColorClass: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  bgUrl: PropTypes.string,
  full: PropTypes.bool,
};

PageHero.defaultProps = {
  children: null,
  bgUrl: '',
  subtitle: '',
  full: false,
};

export default PageHero;
