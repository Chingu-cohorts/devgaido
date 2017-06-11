import React from 'react';
import PropTypes from 'prop-types';

const Course = ({ match, curriculum }) => {
  const course = curriculum.courses[match.params.id];
  return (
    <div className="lostContainer">
      <div className="card card--image colFull">
        <div className="cardHeader cardHeader--image" />
        <div className="cardHeader cardHeader--image--color2">
          <h1 className="cardHeader--pathName">{course.name}</h1>
        </div>
        <span className="cardSmallCaption">COURSE</span>
        <span className="cardBigCaption">{course.name}</span>
        <p className="cardText">{course.description}</p>
      </div>
    </div>
  );
};

Course.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Course;
