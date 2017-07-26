import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';

import { Link } from 'react-router-dom';

import actions from '../../actions';

const { setLastTouchedPath } = actions;

const sliceWidth = 400;

const bgPositions = [
  `${-sliceWidth * 0}px ${-sliceWidth * 1}px`,
  `${-sliceWidth * 1}px ${-sliceWidth * 1}px`,
  `${-sliceWidth * 2}px ${-sliceWidth * 1}px`,
  `${-sliceWidth * 3}px ${-sliceWidth * 1}px`,
  `${-sliceWidth * 4}px ${-sliceWidth * 1}px`,
  `${-sliceWidth * 5}px ${-sliceWidth * 1}px`,
  `${-sliceWidth * 6}px ${-sliceWidth * 1}px`,
];
const LoadingPlaceholder = () => (
  <div className="image-link-card__loading-spinner" />
);

const ImageLinkCard = ({ item, bgColorClass, imgBorderClass, imgSrc, sliceNumber, iconClass, childIconClass, linkTo, pathId }) => {
  const imageStyle = {
    background: `url(${imgSrc})`,
    backgroundSize: 'cover',
  };

  if (sliceNumber > -1) {
    imageStyle.backgroundSize = '400%';
    imageStyle.backgroundPosition = bgPositions[sliceNumber % bgPositions.length];
  }

  return (
    <Link className="card col-quarter border-round bg-white flex-column" to={linkTo} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      <LazyLoad height={200} once placeholder={<LoadingPlaceholder />} offset={201}>
        <div className={`image-link-card__image ${imgBorderClass}`} style={imageStyle} />
      </LazyLoad>
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
          <h4 className="no-margin right">
            <i className={`fa ${childIconClass} h4 right margin-right-tiny`} /><span className="bold">{item.nCompleted}/{item.nTotal}</span>
          </h4> : null}
      </div>
    </Link>
  );
};

ImageLinkCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  bgColorClass: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  sliceNumber: PropTypes.number,
  linkTo: PropTypes.string,
  iconClass: PropTypes.string,
  childIconClass: PropTypes.string,
  imgBorderClass: PropTypes.string,
  pathId: PropTypes.string,
};

ImageLinkCard.defaultProps = {
  iconClass: '',
  childIconClass: '',
  imgBorderClass: '',
  linkTo: '#',
  sliceNumber: -1,
  pathId: undefined,
};

export default ImageLinkCard;
