import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BreadCrumbs = ({ curriculum, pathId, courseId, lessonId, invertIconColors }) => (
  <div className="breadcrumbs abs-top-left">
    <Link className="c-white normal padding-right-tiny" to={'/paths'}>Paths</Link>
    {pathId ? <i className={`fa fa-caret-right padding-right-tiny ${invertIconColors ? 'c-primary' : 'c-secondary '}`} /> : null}
    {pathId ? <Link className="c-white normal padding-right-tiny" to={`/paths/${pathId}`}>{curriculum.paths[pathId].name}</Link> : null}
    {courseId ? <i className={`fa fa-caret-right padding-right-tiny ${invertIconColors ? 'c-primary' : 'c-secondary '}`} /> : null}
    {courseId ? <Link className="c-white normal padding-right-tiny" to={`/paths/${pathId}/${courseId}`}>{curriculum.courses[courseId].name}</Link> : null}
    {lessonId ? <i className={`fa fa-caret-right padding-right-tiny ${invertIconColors ? 'c-primary' : 'c-secondary '}`} /> : null}
    {lessonId ? <Link className="c-white normal padding-right-tiny" to={`/paths/${pathId}/${courseId}/${lessonId}`}>{curriculum.lessons[lessonId].name}</Link> : null}
  </div>
);

BreadCrumbs.propTypes = {
  pathId: PropTypes.string,
  courseId: PropTypes.string,
  lessonId: PropTypes.string,
  invertIconColors: PropTypes.bool,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

BreadCrumbs.defaultProps = {
  pathId: '',
  courseId: '',
  lessonId: '',
  invertIconColors: false,
};

export default BreadCrumbs;
