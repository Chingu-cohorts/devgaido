import React from 'react';
import PropTypes from 'prop-types';

const LinkButton = ({ href, onClick, icon, buttonType, children }) => (
  <a className={`button ${buttonType || 'button--default'} uppercase width-100-below-t margin-right-small-above-t margin-bottom-small-below-t`} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
    <div className="flex items-center justify-center">
      {icon ? <i className={`fa ${icon} margin-right-tiny`} /> : null}
      {children}
    </div>
  </a>
);

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  icon: PropTypes.string,
  buttonType: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

LinkButton.defaultProps = {
  icon: '',
  buttonType: '',
};

export default LinkButton;
