import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const ImageLinkCard = ({ item, bgColorClass, bgImageClass, iconClass, linkTo }) => (
  <Link className="card col-quarter border-round bg-white flex-column" to={linkTo}>
    <div className={`${bgImageClass}`} />
    <div className={`card__header flex align-items-center ${bgColorClass}`}>
      <h5 className="card__header__text flex-1 c-white uppercase no-margin">{item.name}</h5>
      {iconClass ? <i className={`fa c-white h4 ${iconClass}`} /> : null}
    </div>
    <div className="card__content flex-1">
      <p>{item.description ? item.description : 'No description given.'}</p>
    </div>
    <div className="card__footer flex justify-space-between">
      <span className="h5 bold left" />
      {item.nTotal ?
        <h4 className="c-primary no-margin right">
          Completed: <span className="bold">{item.nCompleted}/{item.nTotal}</span>
        </h4> : null}
    </div>
  </Link>
);

ImageLinkCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  bgColorClass: PropTypes.string.isRequired,
  bgImageClass: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  iconClass: PropTypes.string,
};

ImageLinkCard.defaultProps = {
  iconClass: '',
  linkTo: '#',
};

export default ImageLinkCard;
