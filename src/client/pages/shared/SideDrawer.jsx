import React from 'react';
// import PropTypes from 'prop-types';

import BackButton from './BackButton';

const SideDrawer = ({ history }) => {
  const notOnHomeScreen = history.location.pathname !== '/';
  return (
    <div className={`side-drawer ${notOnHomeScreen ? '' : 'hidden'}`}>
      <BackButton history={history} />
      <i className="side-drawer__icon fa fa-chevron-left c-secondary h0" />
    </div>
  );
};

export default SideDrawer;

