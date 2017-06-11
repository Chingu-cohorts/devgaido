import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ curriculum, pathId, courseId, lessonId }) => (
  <div>
    <Link className="breadcrumb" to={'/dashboard'}>Dashboard</Link>
    {pathId ? <span className="breadcrumb">&gt;&gt;</span> : null}
    {pathId ? <Link className="breadcrumb" to={`/paths/${pathId}`}>{curriculum.paths[pathId].name}</Link> : null}
    {courseId ? <span className="breadcrumb">&gt;&gt;</span> : null}
    {courseId ? <Link className="breadcrumb" to={`/paths/${pathId}/${courseId}`}>{curriculum.courses[courseId].name}</Link> : null}
    {lessonId ? <span className="breadcrumb">&gt;&gt;</span> : null}
    {lessonId ? <Link className="breadcrumb" to={`/paths/${pathId}/${courseId}/${lessonId}`}>{curriculum.lessons[lessonId].name}</Link> : null}
  </div>
);

BreadCrumbs.propTypes = {
  pathId: PropTypes.string,
  courseId: PropTypes.string,
  lessonId: PropTypes.string,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

BreadCrumbs.defaultProps = {
  pathId: '',
  courseId: '',
  lessonId: '',
};

export default BreadCrumbs;
