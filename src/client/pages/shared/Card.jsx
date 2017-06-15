import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

// TODO: Find a neat way of changing a cards color (dynamically add css class vs style tag?)
const Card = ({ caption, subcaption, text, content, icons, to, color }) => (
  <Link className="card colQuarter" to={to} >
    <div className="cardHeader" style={color ? { background: color } : {}}>
      {icons.map((icon, index) => (<i className={`cardIcon ${icon}`} key={`${icon}${index}`} />))}
    </div>
    <span className="cardSmallCaption">{subcaption}</span>
    <span className="cardBigCaption">{caption}</span>
    <p className="cardText">{text}</p>
    {content}
  </Link>
);

Card.propTypes = {
  caption: PropTypes.string,
  subcaption: PropTypes.string,
  text: PropTypes.string,
  content: PropTypes.objectOf(PropTypes.shape),
  icons: PropTypes.arrayOf(PropTypes.string),
  color: PropTypes.string,
  to: PropTypes.string,
};

Card.defaultProps = {
  caption: '',
  subcaption: '',
  text: '',
  icons: [],
  to: '',
  content: null,
  color: '',
};

export default Card;
