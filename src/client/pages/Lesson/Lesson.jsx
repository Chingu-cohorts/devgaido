import React from 'react';
import PropTypes from 'prop-types';

import BreadCrumbs from '../shared/BreadCrumbs';

const Lesson = ({ match, curriculum }) => {
  const lesson = curriculum.lessons[match.params.id];
  return (
    <div className="lostContainer">
      <BreadCrumbs curriculum={curriculum} pathId={match.params.pid} courseId={match.params.cid} lessonId={match.params.id} />
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
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Lesson;
