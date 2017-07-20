import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { InfoCard, LinkCard } from '../shared/Cards';
import PageDivider from '../shared/PageDivider';
import DisqusThread from '../shared/DisqusThread';

import actions from '../../actions';

const { addBookmark, removeBookmark } = actions;

const Course = ({ match, curriculum, user }) => {
  const courseId = match.params.id;
  const course = curriculum.courses[courseId];

  let pathId = null;
  let path = null;
  if (course.parentPathIds.indexOf(user.curPathId) !== -1) {
    pathId = user.curPathId;
    path = curriculum.paths[pathId];
  }

  const lessons = course.lessonIds.map((lessonId) => {
    const lesson = curriculum.lessons[lessonId];
    return <LinkCard item={lesson} linkTo={lesson.url} bgColorClass="bg-primary" iconClass="fa-graduation-cap" key={lessonId} connectionClass="connected--secondary" />;
  });

  return (
    <div>
      <Helmet
        title={`Course: ${course.name}`}
        meta={[
          { name: 'description', content: course.description },
        ]}
      />
      <PageHero bgColorClass="bg-secondary" bgImageClass="bg-img__path" title={course.name}>
        {pathId ?
          <BreadCrumbs rootNode={{ name: 'Current Path', url: '/dashboard' }} nodes={[path, course]} invertIconColors /> :
          <BreadCrumbs rootNode={{ name: 'Courses', url: '/library' }} nodes={[course]} invertIconColors />}
        <i className="fa fa-tasks c-white h0 abs-top-right" />
        {course.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      {user.authenticated ?
        <PageDivider>
          <button className="button--primary hidden">Bookmark Course</button>
          <span className="normal h3">
            <i className="fa fa-graduation-cap h3 c-primary margin-right-tiny" />{course.nCompleted}/{course.nTotal}
          </span>
          {!course.bookmarked ?
            <button className="button--primary" onClick={() => addBookmark(courseId, 'courses', course.version)}>Bookmark Course</button> :
            <button className="button--secondary" onClick={() => removeBookmark(courseId, 'courses', course.version)}>Remove Bookmark</button>}
        </PageDivider> :
        <PageDivider />}
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={course} bgColorClass="bg-secondary" />
          </div>
          <div className="grid-half">
            {lessons}
          </div>
        </div>
        {user.authenticated ? <hr /> : null}
        {user.authenticated ?
          <DisqusThread
            id={`/course-${courseId}`}
            title={course.name}
            path={course.url}
          /> : null}
      </div>
    </div>
  );
};

Course.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Course;
