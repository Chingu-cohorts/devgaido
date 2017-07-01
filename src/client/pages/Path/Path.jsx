import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';
import { Link } from 'react-router-dom';

import BreadCrumbs from '../shared/BreadCrumbs';
import InfoCard from '../shared/InfoCard';
import { addBookmark, removeBookmark } from '../../actions/userActions';

const CourseCard = ({ course, linkTo }) => (
  <Link className="connected" to={linkTo}>
    <div className="card-big">
      <div className="card-big-header card-big-header-course">
        <h5 className="card-big-header-text">{course.name}</h5>
        <span className="card-big-header-text-extra">COURSE</span>
      </div>
      <div className="card-big-content">
        <p>{course.description}</p>
        <h4 className="completion-text">{course.nCompleted}/{course.nTotal}</h4>
      </div>
    </div>
  </Link>
);

const Path = ({ match, curriculum, user, dispatch }) => {
  const pathId = match.params.id;
  const path = curriculum.paths[match.params.id];

  const courses = path.courseIds.map((courseId) => {
    const course = curriculum.courses[courseId];
    return <CourseCard linkTo={`/paths/${pathId}/${courseId}`} course={course} key={courseId} />;
  });
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-img page-hero-img-desaturate page-hero-img-path" />
        <div className="page-hero-color-overlay page-hero-color-overlay-path" />
        <div className="page-hero-container">
          <BreadCrumbs curriculum={curriculum} pathId={match.params.id} />
          <h1 className="page-hero-name">{path.name}</h1>
          <h2 className="completion-text-big completion-text-big-left">PATH</h2>
          <h2 className="completion-text-big">{path.nCompleted}/{path.nTotal}</h2>
          {user.bookmarkedPaths.indexOf(pathId) === -1 ?
            <button className="bookmark-button button-pill" onClick={() => dispatch(addBookmark(pathId))}>Add Bookmark</button> :
            <button className="bookmark-button button-pill" onClick={() => dispatch(removeBookmark(pathId))}>Remove Bookmark</button>}
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={path} type="path" />
          </div>
          <div className="grid-half">
            {courses}
          </div>
        </div>
        <hr />
        <ReactDisqusThread
          shortname="devgaido"
          identifier={`/path-${pathId}`}
          title={path.name}
          url={undefined}
          category_id={undefined}
          onNewComment={null}
        />
      </div>
    </div>
  );
};

CourseCard.propTypes = {
  course: PropTypes.objectOf(PropTypes.shape).isRequired,
  linkTo: PropTypes.string.isRequired,
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Path;
