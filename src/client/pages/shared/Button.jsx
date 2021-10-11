import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, icon, className, children }) => (
  <button className={`${className || 'button--default'} uppercase width-100-below-t margin-horizontal-tiny-above-t margin-bottom-small-below-t`} onClick={onClick}>
    <div className="flex items-center justify-center">
      {icon ? <i className={`fa ${icon} margin-right-tiny`} /> : null}
      {children}
    </div>
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  icon: '',
  className: '',
};

export default Button;
