import React from 'react';
import PropTypes from 'prop-types';

const Lesson = ({ match, /* history,*/ curriculum }) => {
  const lesson = curriculum.lessons[match.params.id];
  return (
    <div className="lostContainer">
      {/* <a className="backLink" href="#" onClick={() => history.goBack()}>&larr; Back</a>*/}
      <div className="card card--image colFull">
        <div className="cardHeader cardHeader--image" />
        <div className="cardHeader cardHeader--image--color2">
          <h1 className="cardHeader--pathName">{lesson.name}</h1>
        </div>
        <span className="cardSmallCaption">LESSON</span>
        <span className="cardBigCaption">{lesson.name}</span>
        <p className="cardText">{lesson.description}</p>
      </div>
    </div>
  );
};

Lesson.propTypes = {
  // history: PropTypes.objectOf(PropTypes.shape).isRequired,
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Lesson;
