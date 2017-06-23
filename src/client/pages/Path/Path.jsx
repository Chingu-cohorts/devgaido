import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import BreadCrumbs from '../shared/BreadCrumbs';
import { addBookmark, removeBookmark } from '../../actions/userActions';

const CourseCard = ({ course, linkTo }) => (
  <Link className="course-card connected" to={linkTo}>
    <div className="course-card-header">
      <span className="course-card-caption">COURSE</span>
      <h1>{course.name}</h1>
    </div>
    <div className="course-card-content">
      <p className="course-description">{course.description}</p>
      <h1 className="completion-text">{course.nCompleted}/{course.nTotal}</h1>
    </div>
  </Link>
);

const PathInfoCard = ({ path }) => (
  <div className="course-card connected">
    <div className="course-card-header" style={{ background: '#007399' }}>
      <i className="card-icon path-info-icon fa fa-info" />
      <h1>{path.name}</h1>
    </div>
    <div className="course-card-content">
      <p className="course-description">{path.description}</p>
    </div>
  </div>
);

const Path = ({ match, curriculum, user, dispatch }) => {
  const pathId = match.params.id;
  const path = curriculum.paths[match.params.id];

  const courses = path.courseIds.map((courseId) => {
    const course = curriculum.courses[courseId];
    return <CourseCard linkTo={`/paths/${pathId}/${courseId}`} course={course} key={courseId} />;
  });
  return (
    <div className="container">
      <div className="path-container path path-image">
        <div className="path-header path-header-image" />
        <div className="path-header path-header-image-color">
          <BreadCrumbs curriculum={curriculum} pathId={match.params.id} />
          <h1 className="path-header-path-name">{path.name}</h1>
          <h1 className="completion-text-big">{path.nCompleted}/{path.nTotal}</h1>
          {user.bookmarkedPaths.indexOf(pathId) === -1 ?
            <button className="path-bookmark-button" onClick={() => dispatch(addBookmark(pathId))}>Add Bookmark</button> :
            <button className="path-bookmark-button" onClick={() => dispatch(removeBookmark(pathId))}>Remove Bookmark</button>}
        </div>
        <div className="grid-half">
          <PathInfoCard path={path} />
        </div>
        <div className="grid-half">
          {courses}
        </div>
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.objectOf(PropTypes.shape).isRequired,
  linkTo: PropTypes.string.isRequired,
};

PathInfoCard.propTypes = {
  path: PropTypes.objectOf(PropTypes.shape).isRequired,
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Path;
