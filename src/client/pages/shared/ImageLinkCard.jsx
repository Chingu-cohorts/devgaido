import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const CardTemplate = ({ title, bgColorClass, iconClass, bgImageClass, content }) => (
  <div className="card border-round bg-white flex-column height-100">
    <div className={`${bgImageClass}`} />
    <div className={`card__header flex align-items-center ${bgColorClass}`}>
      <h5 className="card__header__text flex-1 c-white uppercase no-margin">{title}</h5>
      {iconClass ? <i className={`fa c-white h4 ${iconClass}`} /> : null}
    </div>
    <div className="card__content flex-column flex-1">
      {content}
    </div>
  </div>
);

const ImageLinkCard = ({ item, bgColorClass, bgImageClass, iconClass, linkTo }) => (
  <Link className="col-quarter" to={linkTo}>
    {CardTemplate({
      title: item.name,
      bgColorClass,
      iconClass,
      bgImageClass,
      content: (
        <div className="flex-column justify-space-between height-100">
          <p>{item.description ? item.description : 'No description given.'}</p>
          <div className="card__footer flex justify-space-between">
            <span className="h5 bold left">PATH</span>
            {item.nTotal ?
              <h4 className="c-primary no-margin right">
                Completed: <span className="bold">{item.nCompleted}/{item.nTotal}</span>
              </h4> : null}
          </div>
        </div>),
    })}
  </Link>
);

CardTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  bgColorClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string,
  bgImageClass: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

CardTemplate.defaultProps = {
  iconClass: '',
  bgImageClass: '',
};

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
