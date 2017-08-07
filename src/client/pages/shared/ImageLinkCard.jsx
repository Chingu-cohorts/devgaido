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

const ImageLinkCard = ({ item, bgColorClass, imgBorderClass, imgSrc, sliceNumber, iconClass, childIconClass, linkTo, pathId }) => {
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
      ratingStars.push(<i className="fa icon-star c-secondary h6 margin-left-tiny" key={item.name + i} />);
    } else {
      ratingStars.push(<i className="fa icon-star-o c-secondary h6 margin-left-tiny" key={item.name + i} />);
    }
  }

  const progressBarWidth = 80;
  const progress = (progressBarWidth * item.nCompleted) / item.nTotal;

  return (
    <Link className="card col-quarter border-round bg-white flex-column" to={linkTo} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      <LazyLoad height={200} once placeholder={<LoadingPlaceholder />} offset={201}>
        <div className={`image-link-card__image ${imgBorderClass}`} style={imageStyle} />
      </LazyLoad>
      <div className={`card__header flex relative ${bgColorClass}`}>
        {iconClass ? <i className={`fa c-white h5 ${iconClass}`} /> : null}
        <h5 className="card__header__text flex-1 c-white uppercase no-margin margin-left-tiny margin-right-tiny">{item.name}</h5>
        { item.completed ? <i className={'image-link-card__checkmark fa c-white h3 no-margin absolute icon-check-circle-o'} /> : null}
      </div>
      <div className="card__content flex-1">
        <p>{item.description ? item.description : 'No description given.'}</p>
      </div>
      <div className="ilcard__footer flex-column padding-bottom-small padding-horizontal-small">
        <div className="right">
          {ratingStars}
        </div>
        <span className="h5 bold left"></span>
        <div className="flex justify-space-between margin-top-small">
          <div className="flex no-margin right">
            <div style={{ margin: 'auto', background: 'red', width: `${progressBarWidth}`, height: 10 }}>
                <div style={{ background: 'green', width: `${ progress }`, height: 10 }}></div>
            </div>
          </div>
          {item.nTotal && item.nTotal !== 1 ?
            <h4 className="no-margin right margin-top-tiny">
              <i className={`fa ${childIconClass} h4 right margin-right-tiny`} />
              <span className="">{item.nCompleted}/{item.nTotal}</span>
            </h4> : null}
          {item.nLessonsTotal ?
            <h4 className="no-margin right margin-top-tiny">
              <i className={'fa icon-graduation-cap c-primary h4 right  margin-right-tiny'} />
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
