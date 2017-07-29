import React from 'react';
// import PropTypes from 'prop-types';

const BackButton = ({ history }) => (
  <button
    className="back-button border-none"
    onClick={history.goBack}
    ref={(domElem) => { this.buttonRef = domElem; }}
  >
    <i className="fa fa-arrow-left h0" />
  </button>
);

export default BackButton;

