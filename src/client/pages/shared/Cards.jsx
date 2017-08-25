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
  <h4 className="no-margin">
    <i className="fa icon-flag-checkered c-primary h4 margin-right-tiny" />
    <span>{item.nCompleted}/{item.nTotal}</span>
  </h4>
);

const LessonsNumber = ({ item }) => (
  <h4 className="no-margin">
    <i className="fa icon-graduation-cap c-accent h4 margin-right-tiny" />
    <span>{item.nLessonsTotal}</span>
  </h4>
);

const LessonsComplete = ({ item }) => (
  <h4 className="no-margin margin-left-small">
    <i className="fa icon-graduation-cap c-accent h4 margin-right-tiny" />
    <span>{item.nLessonsCompleted}/{item.nLessonsTotal}</span>
  </h4>
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
  const numSubjects = Math.min(3, item.subjectNames.length);
  for (let i = 0; i < numSubjects; i += 1) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-text margin-right-tiny">{item.subjectNames[i]}</h5>);
  }
  if (item.subjectNames.length > 3) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-text">{`... ${item.subjectNames.length - 2} more ...`}</h5>);
  }
  return (
    <div className="right">
      {subjects}
    </div>
  );
};

const EstimatedTime = ({ item }) => (
  <h5 className="c-primary uppercase right no-margin">{item.estimatedTimeStr} hours</h5>
);

const typeIcons = {
  Book: 'fa h3 icon-book c-pale-blue',
  Course: 'fa h3 icon-university c-pale-green',
  Project: 'fa h3 icon-cogs c-pale-red',
};

const MenuCard = ({ children }) => (
  <FlexColumn className="menu-card bg-white c-text padding-small border-round">
    <h4 className="shadow-bottom-primary-2">Menu</h4>
    {children}
  </FlexColumn>
);

const DashboardCard = ({ item }) => {
  const itemIsPath = item.nLessonsTotal !== undefined;
  const typeIcon = itemIsPath ? '' : typeIcons[item.type];
  const completeIcon = itemIsPath ? 'fa h2 icon-check-circle-o c-white' : 'fa h2 icon-check-circle-o c-white';
  const pathId = itemIsPath ? item.id : undefined;
  const bgCol = itemIsPath ? 'bg-primary-25' : 'bg-accent-50';

  return (
    <Link className={'image-link-card col-quarter flex-column bg-white border-round c-text margin-bottom-small'} to={item.url} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      <div className="image-link-card__img bg-cover border-round-top border-1px border-white relative flex-column justify-center" style={{ backgroundImage: `url(${item.img})` }}>
        <div className="border-round-top bg-black opacity-50 abs-center-stretch" />
        <div className={`border-round-top ${bgCol} abs-center-stretch`} />
        <FlexRow className={'items-center padding-horizontal-small padding-vertical-tiny border-round-top c-white relative'}>
          <h3 className="flex-1 no-margin text-shadow-subtle uppercase wider">{item.name}</h3>
          {item.completed ? <i className={completeIcon} /> : null}
        </FlexRow>
      </div>
      <FlexRow>
        <FlexColumn className="flex-2 margin-horizontal-small margin-top-small items-start justify-between">
          <p className="">{item.description}</p>
        </FlexColumn>
        <FlexColumn className="margin-horizontal-small margin-top-small flex-1">
          <FlexRow className="items-center justify-between margin-bottom-tiny">
            <h5 className="no-margin">Rating</h5>
            <RatingStars item={item} />
          </FlexRow>
          <FlexRow className="items-center justify-between">
            <h5 className="no-margin">Estimated Length</h5>
            <EstimatedTime item={item} />
          </FlexRow>
          {item.nLessonsTotal > 0 ?
            <Progress item={item} /> : null}
        </FlexColumn>
      </FlexRow>
      <FlexRow className="margin-horizontal-small margin-bottom-small items-center justify-between">
        <Subjects item={item} />
        {itemIsPath ?
          <FlexRow className="justify-end">
            <MilestonesComplete item={item} />
            <LessonsComplete item={item} />
          </FlexRow> : <i className={typeIcon} />}
      </FlexRow>
    </Link>
  );
};

const MilestoneSubCard = ({ item, completeX }) => {
  const itemIsPath = item.nLessonsTotal !== undefined;
  const typeIcon = itemIsPath ? '' : typeIcons[item.type];
  const completeIcon = itemIsPath ? 'fa h2 icon-check-circle-o c-accent' : 'fa h2 icon-check-circle-o c-accent';
  const pathId = itemIsPath ? item.id : undefined;
  const underline = itemIsPath ? 'shadow-bottom-primary-2' : 'shadow-bottom-accent-2';
  const dotClasses = !completeX ? `dot ${item.completed ? '' : 'dot--empty'} dot--displace` : '';

  return (
    <Link className={`link-card ${dotClasses} flex-column width-100 bg-white border-round c-text margin-bottom-small relative`} to={item.url} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      <FlexRow className={`margin-top-small margin-horizontal-small items-center padding-bottom-tiny ${underline}`}>
        <h3 className="flex-1 no-margin">{item.name}</h3>
        {item.completed ? <i className={completeIcon} /> : null}
      </FlexRow>
      <FlexRow>
        <FlexColumn className="flex-2 margin-horizontal-small margin-top-small items-start justify-between">
          <p className="">{item.description}</p>
        </FlexColumn>
        <FlexColumn className="margin-horizontal-small margin-top-small flex-1">
          <FlexRow className="items-center justify-between margin-bottom-tiny">
            <h5 className="no-margin">Rating</h5>
            <RatingStars item={item} />
          </FlexRow>
          <FlexRow className="items-center justify-between">
            <h5 className="no-margin">Estimated Length</h5>
            <EstimatedTime item={item} />
          </FlexRow>
          {item.nLessonsTotal > 0 ?
            <Progress item={item} /> : null}
        </FlexColumn>
      </FlexRow>
      <FlexRow className="margin-horizontal-small margin-bottom-small items-center justify-between">
        <Subjects item={item} />
        {itemIsPath ?
          <FlexRow className="justify-end">
            <MilestonesComplete item={item} />
            <LessonsComplete item={item} />
          </FlexRow> : <i className={typeIcon} />}
      </FlexRow>
    </Link>
  );
};

const LibraryCard = ({ item }) => {
  const itemIsPath = item.courseIds !== undefined;
  const typeIcon = itemIsPath ? '' : typeIcons[item.type];
  const completeIcon = itemIsPath ? 'fa h2 icon-check-circle-o c-white' : 'fa h2 icon-check-circle-o c-white';
  const pathId = itemIsPath ? item.id : undefined;
  const bgCol = itemIsPath ? 'bg-primary-25' : 'bg-accent-50';
  const metrics = item.nLessonsCompleted > 0 ?
    (<FlexRow className="justify-end">
      <MilestonesComplete item={item} />
      <LessonsComplete item={item} />
    </FlexRow>) : <LessonsNumber item={item} />;
  return (
    <Link className={'image-link-card col-quarter flex-column bg-white border-round c-text margin-bottom-small'} to={item.url} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      <div className="image-link-card__img bg-cover border-round-top border-1px border-white relative flex-column justify-center" style={{ backgroundImage: `url(${item.img})` }}>
        <div className="border-round-top bg-black opacity-50 abs-center-stretch" />
        <div className={`border-round-top ${bgCol} abs-center-stretch`} />
        <FlexRow className={'items-center padding-horizontal-small padding-vertical-tiny border-round-top c-white relative'}>
          <h3 className="flex-1 no-margin text-shadow-subtle uppercase wider">{item.name}</h3>
          {item.completed ? <i className={completeIcon} /> : null}
        </FlexRow>
      </div>
      <p className="flex-1 margin-small">{item.description}</p>
      <FlexColumn className="margin-small">
        <FlexRow className="items-center justify-between">
          {itemIsPath ? metrics : <i className={typeIcon} />}
          <RatingStars item={item} />
        </FlexRow>
        {item.nLessonsTotal > 0 ?
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

LessonsNumber.propTypes = {
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

DashboardCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

MilestoneSubCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

LibraryCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};
export { MenuCard, DashboardCard, LibraryCard, MilestoneSubCard };
