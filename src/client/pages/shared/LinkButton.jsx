import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LinkButton = ({ href, onClick, icon, className, children, openInNewTab }) => (
  <Link className={`button ${className || 'button--default'} uppercase width-100-below-t margin-right-small-above-t margin-bottom-small-below-t`} to={href} target={openInNewTab ? '_blank' : '_self'} rel="noopener noreferrer" onClick={onClick}>
    <div className="flex items-center justify-center">
      {icon ? <i className={`fa ${icon} margin-right-tiny`} /> : null}
      {children}
    </div>
  </Link>
);

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
  openInNewTab: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

LinkButton.defaultProps = {
  icon: '',
  className: '',
  onClick: null,
  openInNewTab: false,
};

export default LinkButton;
