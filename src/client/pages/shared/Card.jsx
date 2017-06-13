import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

// TODO: Find a neat way of changing a cards color (dynamically add css class vs style tag?)
const Card = ({ caption, subcaption, text, selected, content, icons, to, color }) => (
  <Link className={`grid-quarter card${selected ? ' selected' : ''}`} to={to} >
    <div className="card-header" style={color ? { background: color } : {}}>
      {icons.map((icon, index) => (<i className={`card-icon ${icon}`} key={`${icon}${index}`} />))}
    </div>
    <span className="card-caption-small">{subcaption}</span>
    <span className="card-caption-big">{caption}</span>
    <p className="card-text">{text}</p>
    {content}
  </Link>
);

Card.propTypes = {
  selected: PropTypes.bool,
  caption: PropTypes.string,
  subcaption: PropTypes.string,
  text: PropTypes.string,
  content: PropTypes.objectOf(PropTypes.shape),
  icons: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  to: PropTypes.string,
};

Card.defaultProps = {
  selected: false,
  caption: '',
  subcaption: '',
  text: '',
  icons: [],
  to: '',
  content: null,
  color: '',
};

export default Card;
