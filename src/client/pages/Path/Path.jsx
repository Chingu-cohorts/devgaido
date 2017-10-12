import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import LazyLoad from 'react-lazyload';
import { connect } from 'react-redux';

import BigPathCard from '../shared/Cards/BigPathCard/BigPathCard';

import MilestoneCard from './MilestoneCard';
import PageHero from '../shared/PageHero';
import { ResourceCard } from '../shared/Cards';
import DisqusThread from '../shared/DisqusThread';
import AnimateVisibleChildrenDiv from '../shared/AnimateVisibleChildrenDiv';

const typeIcons = {
  Book: 'icon-book',
  Course: 'icon-university',
  Project: 'icon-cogs',
};

const PathMarker = ({ text, dotClass, iconClass, path }) => (
  <div className={`path-marker mclosed relative ${dotClass} flex flex-column-below-t items-center items-start-below-t bg-grey border-round`}>
    <h3 className="path-marker__text flex-1 h4-below-t uppercase no-margin c-white margin-right-small wide">{text}</h3>
    <div className="flex items-center justify-end width-100-below-t">
      {path && path.nTotal !== 1 ?
        <h3 className="no-margin right c-white h4-below-t margin-right-small-below-t">
          <i className={'fa icon-flag-checkered h3 h4-below-t right margin-left-big-above-t margin-right-tiny'} />
          <span>{path.nCompleted}/{path.nTotal}</span>
        </h3> : null}
      {path && path.nLessonsTotal ?
        <h3 className="no-margin right c-white h4-below-t">
          <i className={'fa icon-graduation-cap h3 h4-below-t right margin-left-big-above-t margin-right-tiny'} />
          <span>{path.nLessonsCompleted}/{path.nLessonsTotal}</span>
        </h3> : null}
      {iconClass ? <i className={`fa ${iconClass} absolute c-white h1 `} /> : null}
    </div>
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
        return (
          <ResourceCard item={lesson} key={lessonId} completeX={course.completeX} />);
      });

      return <MilestoneCard index={index} course={course} lessons={lessons} key={courseId} id={`${pathId}/${courseId}`} />;
    });
  } else {
    const course = curriculum.courses[path.courseIds[0]];
    const lessons = course.lessonIds.map((lessonId) => {
      const lesson = curriculum.lessons[lessonId];
      return (
        <ResourceCard
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
        <i className="fa icon-map-signs c-white h2 abs-top-right margin-top-small margin-right-small display-none-below-t" />
        {path.completed ? <i className="fa icon-check-circle-o c-white h1 abs-bottom-right margin-bottom-small margin-right-small" /> : null}
      </PageHero>
      <BigPathCard path={path} />
      <div className="path__content container flex margin-vertical-big" id="path-content">
        <div className="path-node flex-column items-center">
          <div className="path-node__connection flex-1 margin-bottom">
            <p className="hidden">content</p>
          </div>
        </div>
        <AnimateVisibleChildrenDiv dontTriggerOnUpdate className="flex-column">
          <PathMarker
            text={`Path: ${path.name}`}
            iconClass="path-marker__start-icon icon-map-marker"
            dotClass="dot--big"
            path={path}
          />
          <div className="margin-top-small">
            {milestones.concat([<PathMarker
              text={'Path Completion'}
              dotClass={`dot--big ${path.completed ? 'dot--trophy' : 'dot--empty'}`}
            />])}
          </div>
        </AnimateVisibleChildrenDiv>
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

PathMarker.propTypes = {
  text: PropTypes.string.isRequired,
  dotClass: PropTypes.string.isRequired,
  path: PropTypes.objectOf(PropTypes.shape),
  iconClass: PropTypes.string,
};

PathMarker.defaultProps = {
  path: null,
  iconClass: '',
};

export default connect(store => ({
  curriculum: store.curriculum,
  user: store.user,
}))(Path);
