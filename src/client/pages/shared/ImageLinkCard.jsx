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
  <div className="image-link-card__loading-spinner loading-spinner" />
);

const ImageLinkCard = ({ item, bgColorClass, imgBorderClass, imgSrc, sliceNumber, iconClass, childIconClass, linkTo, pathId, checkmarkColor }) => {
  const imageStyle = {
    background: `url(${imgSrc})`,
    backgroundSize: 'cover',
  };

  if (sliceNumber > -1) {
    imageStyle.backgroundSize = '400%';
    imageStyle.backgroundPosition = bgPositions[sliceNumber % bgPositions.length];
  }

  const ratingStars = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < item.rating) {
      ratingStars.push(<i className="fa icon-star c-accent h6 margin-left-tiny" key={item.name + i} />);
    } else {
      ratingStars.push(<i className="fa icon-star-o c-accent h6 margin-left-tiny" key={item.name + i} />);
    }
  }

  const progressInverse = 100 - ((100 * item.nLessonsCompleted) / item.nLessonsTotal);

  return (
    <Link className="card col-quarter border-round bg-white flex-column" to={linkTo} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      <div className={`image-link-card__image border-transparent border-1px relative`}>
        <LazyLoad height={200} once placeholder={<LoadingPlaceholder />} offset={201}>
          <div className={`image-link-card__image border-white abs-center-stretch border-1px`} style={imageStyle} />
        </LazyLoad>
        <div className={`image-link-card__image bg-black opacity-5 abs-center-stretch border-transparent border-1px`} />
      </div>
      <div className={`flex relative padding-vertical-tiny padding-top-small padding-horizontal-small`}>
        {iconClass ? <i className={`fa margin-right-tiny h4 ${iconClass}`} /> : null}
        <h4 className="card__header__text flex-1 uppercase no-margin margin-left-tiny margin-right-tiny wide">{item.name}</h4>
        { item.completed ? <i className={`image-link-card__checkmark fa h3 no-margin margin-top-tiny absolute ${checkmarkColor} icon-check-circle-o`} /> : null}
        </div>
      <div className={`il-card__header ${bgColorClass}`}>
      </div>
      <div className="card__content flex-1">
        <p>{item.description ? item.description : 'No description given.'}</p>
      </div>
      <div className="right margin-horizontal-small">
        {ratingStars}
      </div>
      {item.nLessonsTotal ?
        <div className="flex no-margin margin-top-small margin-horizontal-small">
          <div className="progress border-pill overflow-hidden">
            <div className="progress__fill bg-accent border-pill" />
            <div className="progress__mask" style={{ width: `${progressInverse}%` }} />
          </div>
        </div> : null}
      <div className="ilcard__footer flex-column padding-bottom-small padding-horizontal-small">
        <span className="h5 bold left" />
        <div className="flex justify-end margin-top-small">
          {item.nTotal && item.nTotal !== 1 ?
            <h4 className="no-margin margin-top-tiny">
              <i className={`fa ${childIconClass} h4 margin-right-tiny`} />
              <span className="">{item.nCompleted}/{item.nTotal}</span>
            </h4> : null}
          {item.nLessonsTotal ?
            <h4 className="no-margin margin-top-tiny margin-left">
              <i className={'fa icon-graduation-cap c-accent h4 margin-right-tiny'} />
              <span className="">{item.nLessonsCompleted}/{item.nLessonsTotal}</span>
            </h4> : null}
        </div>
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
