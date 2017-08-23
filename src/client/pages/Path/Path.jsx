import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';

import MilestoneCard from './MilestoneCard';
import PageHero from '../shared/PageHero';
import { MilestoneSubCard } from '../shared/Cards';
import DisqusThread from '../shared/DisqusThread';

import actions from '../../actions';

const { addBookmark, removeBookmark } = actions;

const typeIcons = {
  Book: 'icon-book',
  Course: 'icon-university',
  Project: 'icon-cogs',
};

const Subjects = ({ item }) => {
  const subjects = [];
  const numSubjects = Math.min(3, item.subjectNames.length);
  for (let i = 0; i < numSubjects; i += 1) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-text margin-left-tiny">{item.subjectNames[i]}</h5>);
  }
  if (item.subjectNames.length > 3) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-tex margin-left-tiny">{`... ${item.subjectNames.length - 2} more ...`}</h5>);
  }
  return (
    <div className="right">
      {subjects}
    </div>
  );
};

const PathMarker = ({ text, dotClass, iconClass, path }) => (
  <div className={`path-marker relative ${dotClass} flex items-center bg-grey border-round`}>
    <h3 className="path-marker__text flex-1 uppercase no-margin c-white margin-right-small wide">{text}</h3>
    {path && path.nTotal !== 1 ?
      <h3 className="no-margin right c-white">
        <i className={'fa icon-flag-checkered h3 right margin-left-big margin-right-tiny'} />
        <span>{path.nCompleted}/{path.nTotal}</span>
      </h3> : null}
    {path && path.nLessonsTotal ?
      <h3 className="no-margin right c-white">
        <i className={'fa icon-graduation-cap h3 right margin-left-big margin-right-tiny'} />
        <span>{path.nLessonsCompleted}/{path.nLessonsTotal}</span>
      </h3> : null}
    {iconClass ? <i className={`fa ${iconClass} absolute c-white h1 `} /> : null}
  </div>);

const Path = ({ match, curriculum, user }) => {
  const pathId = match.params.id;
  const path = curriculum.paths[match.params.id];
  let milestones = null;

  if (path.courseIds.length > 1) {
    milestones = path.courseIds.map((courseId, index) => {
      const course = curriculum.courses[courseId];
      const lessons = course.lessonIds.map((lessonId) => {
        const lesson = curriculum.lessons[lessonId];
        const dotClasses = !course.completeX ? `dot ${lesson.completed ? '' : 'dot--empty'} dot--displace` : '';
        return (
          <MilestoneSubCard item={lesson} key={lessonId} />);
      });

      return <MilestoneCard index={index} course={course} lessons={lessons} key={courseId} id={`${pathId}/${courseId}`} />;
    });
  } else {
    const course = curriculum.courses[path.courseIds[0]];
    const lessons = course.lessonIds.map((lessonId) => {
      const lesson = curriculum.lessons[lessonId];
      return (
        <MilestoneSubCard
          item={lesson}
          linkTo={lesson.url}
          bgColorClass={`relative no-milestone dot ${lesson.completed ? '' : 'dot--empty'} dot--displace bg-accent`}
          iconClass={typeIcons[lesson.type]}
          key={lessonId}
          imgSrc={`/screenshots/${lessonId}.jpg`}
        />);
    });
    milestones = lessons;
  }

  const ratingStars = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < path.rating) {
      ratingStars.push(<i className="fa icon-star c-accent h4 margin-left-tiny" key={path.name + i} />);
    } else {
      ratingStars.push(<i className="fa icon-star-o c-accent h4 margin-left-tiny" key={path.name + i} />);
    }
  }

  return (
    <div>
      <Helmet
        title={`Path: ${path.name}`}
        meta={[
          { name: 'description', content: path.description },
        ]}
      />
      <PageHero bgColorClass="bg-primary" bgUrl={`/paths/${pathId}.jpg`} title={path.name} full>
        <i className="fa icon-map-signs c-white h2 abs-top-right margin-top-small margin-right-small" />
        {path.completed ? <i className="fa icon-check-circle-o c-white h1 abs-bottom-right margin-bottom-small margin-right-small" /> : null}
      </PageHero>
      <div className="page-hero__offset">
        <div className="container">
          <div className="flex bg-white padding-horizontal-big border-round margin-top-small">
            <div className="padding-vertical-big flex-2">
              <h2 className="c-accent">About This Path</h2>
              <p >{path.description}</p>
              {path.goal ?
                <div>
                  <h3 className="margin-top-big uppercase c-primary">Goal</h3>
                  <p>{path.goal}</p>
                </div> : null}
            </div>
            <div className="padding-vertical-big margin-left-huge flex-1">
              { user.authenticated ?
                <div className="right margin-bottom-big">
                  {!path.bookmarked ?
                    <button className="button--default uppercase" onClick={() => addBookmark(pathId, 'paths', path.version)}>Bookmark</button> :
                    <button className="button--default uppercase" onClick={() => removeBookmark(pathId, 'paths', path.version)}>Remove Bookmark</button>}
                </div> :
                <div className="right margin-bottom-big">
                  <button className="button--default uppercase hidden">Bookmark</button>
                </div> }
              <div className="flex justify-between">
                <h5 className="normal">Rating</h5>
                <div>
                  {ratingStars}
                </div>
              </div>
              <div className="flex justify-between">
                <h5 className="normal">Estimated Length</h5>
                <div>
                  {/* <h4 className="c-primary uppercase right no-margin">Very Long</h4>*/}
                  <h5 className="c-primary uppercase right">{path.estimatedTimeStr} hours</h5>
                </div>
              </div>
              <div className="flex justify-between">
                <h5 className="normal">Tags</h5>
                <div className="width-75 right">
                  <Subjects item={path} />
                </div>
              </div>
              {path.salary !== undefined ?
                <div className="flex justify-between margin-top-big">
                  <h5 className="normal">Estimated Entry Salary</h5>
                  <div className="right">
                    <h2 className="c-accent right no-margin margin-left-big">{path.salary[0]}</h2>
                    <p className="c-primary">{path.salary[1]}</p>
                  </div>
                </div> : null}
            </div>
          </div>
        </div>
      </div>
      <div className="path__content container flex margin-vertical-big">
        <div className="path-node flex-column items-center">
          <div className="path-node__connection flex-1 margin-bottom">
            <p className="hidden">content</p>
          </div>
        </div>
        <div className="container flex-column">
          <PathMarker
            text={`Path: ${path.name}`}
            iconClass="path-marker__start-icon icon-map-marker"
            dotClass="dot--big"
            path={path}
          />
          <div className="margin-top-small">
            {milestones}
          </div>
          <PathMarker
            text={'Path Completion'}
            dotClass={`dot--big ${path.completed ? 'dot--trophy' : 'dot--empty'}`}
          />
        </div>
      </div>
      <div className="container margin-top-huge">
        {user.authenticated ? <hr /> : null}
        {user.authenticated ?
          <LazyLoad height={200} once offset={101}>
            <DisqusThread
              id={`/path-${pathId}`}
              title={path.name}
              path={path.url}
            />
          </LazyLoad>
         : null}
      </div>
    </div>
  );
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  curriculum: store.curriculum,
  user: store.user,
}))(Path);
