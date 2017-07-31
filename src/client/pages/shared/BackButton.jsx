import React from 'react';
// import PropTypes from 'prop-types';

const goBack = (history) => {
  if (!(history.location.state && history.location.state.redirectFromHome)) {
    history.goBack();
  }
};

const BackButton = ({ history }) => (
  <button
    className="back-button border-none"
    onClick={() => goBack(history)}
    ref={(domElem) => { this.buttonRef = domElem; }}
  >
    <i className="fa fa-arrow-left h0" />
  </button>
);

export default BackButton;
