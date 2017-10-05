import React from 'react';
import PropTypes from 'prop-types';

const LinkButton = ({ href, onClick, icon, className, children }) => (
  <a className={`button ${className || 'button--default'} uppercase width-100-below-t margin-right-small-above-t margin-bottom-small-below-t`} href={href} target="_blank" rel="noopener noreferrer" onClick={onClick}>
    <div className="flex items-center justify-center">
      {icon ? <i className={`fa ${icon} margin-right-tiny`} /> : null}
      {children}
    </div>
  </a>
);

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

LinkButton.defaultProps = {
  icon: '',
  className: '',
  onClick: null,
};

export default LinkButton;
