import React from 'react';
import PropTypes from 'prop-types';

const handleSliderCardClick = (e, linkTo, history) => {
  e.preventDefault();
  history.push(linkTo);
};

const SliderCard = ({ item, bgColorClass, iconClass, linkTo, history, refCallback }) => (
  <a
    className="slider-card card flex-column border-round bg-white connected-horizontal relative width-100"
    href={linkTo}
    onClick={e => handleSliderCardClick(e, linkTo, history)}
    ref={domElem => refCallback(domElem)}
  >
    <div className={`card__header flex align-items-center border-round-top ${bgColorClass}`}>
      <h5 className="card__header__text flex-1 c-white uppercase no-margin">{item.name}</h5>
      {iconClass ? <i className={`fa c-white h4 ${iconClass}`} /> : null}
    </div>
    <div className="card__content flex-1">
      <p>{item.description ? item.description : 'No description given.'}</p>
    </div>
    <div className="card__footer width-100 right">
      {item.completed ? <i className="fa fa-check-circle-o h1 c-primary" /> : null}
    </div>
  </a>
);

SliderCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  bgColorClass: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  iconClass: PropTypes.string,
  history: PropTypes.objectOf(PropTypes.shape).isRequired,
  refCallback: PropTypes.func.isRequired,
};

SliderCard.defaultProps = {
  iconClass: '',
  linkTo: '#',
  connectionClass: '',
  heightClass: '',
};

export default SliderCard;
