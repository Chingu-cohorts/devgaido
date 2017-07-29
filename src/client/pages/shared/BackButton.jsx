import React from 'react';
// import PropTypes from 'prop-types';

const BackButton = ({ history }) => {
  const notOnHomeScreen = history.location.pathname !== '/';
  return (
    <button
      className={`back-button border-none ${notOnHomeScreen ? '' : 'hidden'}`}
      onClick={history.goBack}
      ref={(domElem) => { this.buttonRef = domElem; }}
    >
      <i className="fa fa-arrow-left h0" />
    </button>
  );
};

export default BackButton;

