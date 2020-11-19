import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';

import RatingStars from './Cards/shared/RatingStars';
import SubjectTags from './Cards/shared/SubjectTags';

import StateProvider from '../shared/StateProvider';

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

// TODO: Create unique keys
const Subjects = ({ item }) => {
  const subjects = [];
  const numSubjects = Math.min(3, item.subjectNames.length);
  for (let i = 0; i < numSubjects; i += 1) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-text margin-right-tiny" key={item.name + item.subjectNames[i].name + i} >{item.subjectNames[i]}</h5>);
  }
  if (item.subjectNames.length > 3) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-text" key={`${item.name}...`}>{'...'}</h5>);
  }
  return (
    <div className="right">
      {subjects}
    </div>
  );
};

const EstimatedTime = ({ item }) => (
  <h5 className="c-primary uppercase no-margin">{item.estimatedTimeStr} hours</h5>
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

// Add shouldComponentUpdate so opening Milestones doesn't cause needless rerenders
const shouldComponentUpdate = (that, nextProps) => nextProps.item !== that.props.item;

const ResourceCard = StateProvider(({ item, completeX, showDot }) => {
  const itemIsPath = item.nLessonsTotal !== undefined;
  const typeIcon = itemIsPath ? '' : typeIcons[item.type];
  const completeIcon = itemIsPath ? 'fa h2 h3-below-d icon-check-circle-o c-white' : 'fa h2 h3-below-d icon-check-circle-o c-white';
  const pathId = itemIsPath ? item.id : undefined;
  const bgCol = itemIsPath ? 'bg-primary-25' : 'bg-accent-50';

  let dotClasses = '';
  if (showDot) {
    dotClasses = !completeX ? `dot ${item.completed ? '' : 'dot--empty'} dot--displace` : '';
  }

  return (
    <Link className={`image-link-card ${dotClasses} relative col-quarter flex-column bg-white border-round c-text margin-bottom-small _c-text_`} to={item.url} onClick={pathId ? () => setLastTouchedPath(pathId) : null}>
      <div className="image-link-card__img bg-cover border-round-top relative flex-column justify-center" style={{ backgroundImage: `url(${item.img})` }}>
        <div className="border-round-top bg-black opacity-50 abs-center-stretch" />
        <div className={`border-round-top ${bgCol} abs-center-stretch`} />
        <FlexRow className={'items-center padding-horizontal-small padding-vertical-tiny border-round-top c-white relative'}>
          <h3 className="flex-1 no-margin text-shadow-subtle uppercase wider h4-below-d center">{item.name}</h3>
          {item.completed ? <i className={completeIcon} /> : null}
        </FlexRow>
      </div>
      <div className="margin-horizontal-small margin-top-small flex-1">
        <FlexRow className="flex-column-below-m justify-between-above-m items-center-below-m">
          <RatingStars item={item} />
          <EstimatedTime item={item} />
        </FlexRow>
        {item.nLessonsTotal > 0 ?
          <Progress item={item} /> : null}
        <p className="margin-top-small">{item.description}</p>
      </div>
      { itemIsPath ?
        <FlexRow className="flex flex-column-below-t margin-horizontal-small margin-bottom-small items-end justify-between items-center-below-t">
          <div className="order-2-below-t">
            <SubjectTags item={item} />
          </div>
          <FlexRow className="justify-end order-1-below-t margin-bottom-small-below-t">
            <MilestonesComplete item={item} />
            <LessonsComplete item={item} />
          </FlexRow>
        </FlexRow> :
        <FlexRow className="margin-horizontal-small margin-bottom-small items-start justify-between">
          <SubjectTags item={item} />
          <i className={typeIcon} />
        </FlexRow> }
    </Link>
  );
}, {}, {
  shouldComponentUpdate,
});

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

ResourceCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export { MenuCard, ResourceCard };
