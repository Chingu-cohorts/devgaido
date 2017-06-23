import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ curriculum, pathId, courseId, lessonId }) => (
  <div className="breadcrumbs-container">
    <Link className="breadcrumb" to={'/paths'}>Paths</Link>
    {pathId ? <i className="breadcrumb-icon fa-caret-right" /> : null}
    {pathId ? <Link className="breadcrumb" to={`/paths/${pathId}`}>{curriculum.paths[pathId].name}</Link> : null}
    {courseId ? <i className="breadcrumb-icon fa-caret-right" /> : null}
    {courseId ? <Link className="breadcrumb" to={`/paths/${pathId}/${courseId}`}>{curriculum.courses[courseId].name}</Link> : null}
    {lessonId ? <i className="breadcrumb-icon fa-caret-right" /> : null}
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
