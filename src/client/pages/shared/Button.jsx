import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, icon, buttonType, children }) => (
  <button className={`${buttonType || 'button--default'} uppercase width-100-below-t margin-right-small-above-t margin-bottom-small-below-t`} onClick={onClick}>
    <div className="flex items-center justify-center">
      {icon ? <i className={`fa ${icon} margin-right-tiny`} /> : null}
      {children}
    </div>
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  buttonType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  icon: '',
  buttonType: '',
};

export default Button;
