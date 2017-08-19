import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import actions from '../../actions';

const { setLastTouchedPath } = actions;

const FlexRow = ({ className, children }) => (
  <div className={`flex ${className}`}>
    {children}
  </div>
);

const FlexColumn = ({ className, children }) => (
  <div className={`flex-column ${className}`}>
    {children}
  </div>
);

const Progress = ({ item }) => {
  const progressInverse = 100 - ((100 * item.nLessonsCompleted) / item.nLessonsTotal);
  return (
    <div className="margin-vertical-small">
      <div className="progress relative bg-light-grey border-pill overflow-hidden">
        <div className="progress__fill bg-accent border-pill" />
        <div className="progress__mask abs-top-right bg-light-grey" style={{ width: `${progressInverse}%` }} />
      </div>
    </div>
  );
};

const MilestonesComplete = ({ item }) => (
  <h3 className="no-margin">
    <i className="fa icon-flag-checkered c-primary h3 margin-right-tiny" />
    <span>{item.nCompleted}/{item.nTotal}</span>
  </h3>
);

const LessonsComplete = ({ item }) => (
  <h3 className="no-margin margin-left-small">
    <i className="fa icon-graduation-cap c-accent h3 margin-right-tiny" />
    <span>{item.nLessonsCompleted}/{item.nLessonsTotal}</span>
  </h3>
);

const RatingStars = ({ item }) => {
  const ratingStars = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < item.rating) {
      ratingStars.push(<i className="fa icon-star c-accent h4 margin-left-tiny" key={item.name + i} />);
    } else {
      ratingStars.push(<i className="fa icon-star-o c-accent h4 margin-left-tiny" key={item.name + i} />);
    }
  }
  return (
    <div className="right">
      {ratingStars}
    </div>
  );
};

const Subjects = ({ item }) => {
  const subjects = [];
  const numSubjects = Math.min(2, item.subjectNames.length);
  for (let i = 0; i < numSubjects; i += 1) {
    subjects.push(item.subjectNames[i]);
  }
  if (item.subjectNames.length > 2) {
    subjects.push(`... ${item.subjectNames.length - 2} more ...`);
  }
  return (
    <div className="right">
      {subjects}
    </div>
  );
};

const EstimatedTime = ({ item }) => (
  <h5 className="c-primary uppercase right margin-top-small">{item.estimatedTimeStr} hours</h5>
);

const MenuCard = ({ children }) => (
  <FlexColumn className="menu-card bg-white c-text padding-small border-round">
    <h4 className="shadow-bottom-primary-2">Menu</h4>
    {children}
  </FlexColumn>
);

const LinkCard = ({ item }) => {
  const itemIsPath = item.nLessonsTotal !== undefined;
  const typeIcon = itemIsPath ? 'fa h3 icon-map-signs c-primary' : 'fa h3 icon-graduation-cap c-accent';
  const completeIcon = itemIsPath ? 'fa h2 icon-check-circle-o c-primary' : 'fa h2 icon-check-circle-o c-accent';
  const underline = itemIsPath ? 'shadow-bottom-primary-2' : 'shadow-bottom-accent-2';
  const pathId = itemIsPath ? item.id : undefined;

  return (
    <Link className={'link-card flex-column width-100 bg-white border-round c-text margin-bottom-small'} to={item.url} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      <FlexRow className={`margin-top-small margin-horizontal-small items-center padding-bottom-tiny ${underline}`}>
        <i className={typeIcon} />
        <h3 className="flex-1 no-margin margin-left-small">{item.name}</h3>
        {item.completed ? <i className={completeIcon} /> : null}
      </FlexRow>
      <FlexRow className="margin items-start">
        <LazyLoad height={200} once offset={201}>
          <img className="height-auto width-33" src={item.img} alt="" />
        </LazyLoad>
        <FlexColumn className="margin-left">
          <p className="">{item.description}</p>
          <RatingStars item={item} />
          <EstimatedTime item={item} />
          <Subjects item={item} />
          {itemIsPath ?
            <Progress item={item} /> : null}
          {itemIsPath ?
            <FlexRow className="justify-end">
              <MilestonesComplete item={item} />
              <LessonsComplete item={item} />
            </FlexRow> : null}
        </FlexColumn>
      </FlexRow>
    </Link>
  );
};

const typeIcons = {
  Book: 'fa h3 icon-book c-primary',
  Course: 'fa h3 icon-university c-primary',
  Project: 'fa h3 icon-cogs c-primary',
};

const ImageLinkCard = ({ item }) => {
  const itemIsPath = item.nLessonsTotal !== undefined;
  const typeIcon = itemIsPath ? '' : typeIcons[item.type];
  const completeIcon = itemIsPath ? 'fa h2 icon-check-circle-o c-white' : 'fa h2 icon-check-circle-o c-white';
  const underline = itemIsPath ? 'shadow-vertical-primary-2' : 'shadow-vertical-accent-2';
  const pathId = itemIsPath ? item.id : undefined;
  const bgCol = itemIsPath ? 'bg-primary-25' : 'bg-accent-50';

  return (
    <Link className={'image-link-card col-quarter flex-column bg-white border-round c-text margin-bottom-small'} to={item.url} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      <div className="image-link-card__img bg-cover border-round-top border-1px border-white relative flex-column justify-center" style={{ backgroundImage: `url(${item.img})` }}>
        <div className="border-round-top bg-black opacity-50 abs-center-stretch" />
        <div className={`border-round-top ${bgCol} abs-center-stretch`} />
        <FlexRow className={`items-center padding-horizontal-small padding-vertical-tiny border-round-top c-white relative`}>
          <h3 className="flex-1 no-margin text-shadow-subtle uppercase wider">{item.name}</h3>
          {item.completed ? <i className={completeIcon} /> : null}
        </FlexRow>
      </div>
      <p className="flex-1 margin-small">{item.description}</p>
      <FlexColumn className="margin-small">
        <FlexRow className="justify-between">
          <i className={typeIcon} />
          <RatingStars item={item} />
        </FlexRow>
        {itemIsPath ?
          <Progress item={item} /> : null}
      </FlexColumn>
    </Link>
  );
};

FlexRow.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

FlexRow.defaultProps = {
  className: '',
};

FlexColumn.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

FlexColumn.defaultProps = {
  className: '',
};

Progress.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

RatingStars.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

Subjects.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

MilestonesComplete.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

LessonsComplete.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

EstimatedTime.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

MenuCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

LinkCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

ImageLinkCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};
export { MenuCard, LinkCard, ImageLinkCard };
