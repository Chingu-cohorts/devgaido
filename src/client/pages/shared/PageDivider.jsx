import React from 'react';
import PropTypes from 'prop-types';

const PageDivider = ({ children }) => (
  <div className="page-divider padding-top-tiny bg-white">
    <div className="page-divider__content container height-100 flex flex-column-below-t justify-between items-center items-stretch-below-t">
      {children}
    </div>
  </div>
);

PageDivider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PageDivider.defaultProps = {
  children: null,
};

export default PageDivider;
