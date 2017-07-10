import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';

import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { InfoCard, LinkCard } from '../shared/Cards';
import PageDivider from '../shared/PageDivider';

import { addBookmark, removeBookmark } from '../../actions/curriculumActions';

const handleAddBookmarkClick = (courseId, dispatch) => () => dispatch(addBookmark(courseId, 'courses'));
const handleRemoveBookmarkClick = (courseId, dispatch) => () => dispatch(removeBookmark(courseId, 'courses'));

const Course = ({ match, curriculum, user, dispatch }) => {
  const courseId = match.params.id;
  const course = curriculum.courses[courseId];

  let pathId = null;
  if (course.parentPathIds.indexOf(user.curPathId) !== -1) {
    pathId = user.curPathId;
  }

  const lessons = course.lessonIds.map((lessonId) => {
    const lesson = curriculum.lessons[lessonId];
    return <LinkCard item={lesson} linkTo={lesson.url} bgColorClass="bg-primary" iconClass="fa-graduation-cap" key={lessonId} connectionClass="connected--secondary" />;
  });

  return (
    <div>
      <PageHero bgColorClass="bg-secondary" bgImageClass="bg-img__path" title={course.name}>
        {pathId ? <BreadCrumbs
          curriculum={curriculum}
          pathId={pathId}
          courseId={courseId}
          invertIconColors
        /> : null}
        <i className="fa fa-tasks c-white h0 abs-top-right" />
        {course.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      <PageDivider>
        <button className="button--primary hidden">Bookmark Course</button>
        <span className="c-primary normal h3">Lessons completed: {course.nCompleted}/{course.nTotal}</span>
        {!course.bookmarked ?
          <button className="button--primary" onClick={handleAddBookmarkClick(courseId, dispatch)}>Bookmark Course</button> :
          <button className="button--secondary" onClick={handleRemoveBookmarkClick(courseId, dispatch)}>Remove Bookmark</button>}
      </PageDivider>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={course} bgColorClass="bg-secondary" />
          </div>
          <div className="grid-half">
            {lessons}
          </div>
        </div>
        <hr />
        <ReactDisqusThread
          shortname="devgaido"
          identifier={`/course-${courseId}`}
          title={course.name}
          url={undefined}
          category_id={undefined}
          onNewComment={null}
        />
      </div>
    </div>
  );
};

Course.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Course;
