import React from 'react';
import PropTypes from 'prop-types';
import LearningPath from '../shared/LearningPath';

const handleRegisterClick = () => {
  // console.log('CLICKED ON REGISTER');
};

const CourseCatalog = props => (
  <div>
    <div className="side-panel side-panel-catalog is-visible">
      <h1>Course Catalog</h1>
      <div className="panel-menu">
        <h2>Select topic</h2>
        <div className="catalog">
          {props.learningPath.subjects.map(subject =>
            <label htmlFor={subject.Name} key={subject.Name}>
              <input type="checkbox" name={subject.Name} value={subject.Name} />
              <div className="checkmark" />{subject.Name}
            </label>,
        )}
        </div>
        <h2>Select skill level</h2>
        <div className="catalog">
          <label htmlFor="Prerequisite"><input type="checkbox" name="Prerequisite" value="Prerequisite" /><div className="checkmark" />Prerequisite</label>
          <label htmlFor="Beginner"><input type="checkbox" name="Beginner" value="Beginner" /><div className="checkmark" />Beginner</label>
          <label htmlFor="Intermediate"><input type="checkbox" name="Intermediate" value="Intermediate" /><div className="checkmark" />Intermediate</label>
          <label htmlFor="Advanced"><input type="checkbox" name="Advanced" value="Advanced" /><div className="checkmark" />Advanced</label>
        </div>
        <h2>Ready to Get Started?</h2>
        <button className="inline button-continue" type="button" onClick={handleRegisterClick} ><i />Sign Me Up!</button>
      </div>
    </div>

    <div className="content container-wide">
      <LearningPath
        lessons={props.learningPath.lessons}
        detailedLesson={props.learningPath.lessons[0]}
      />
    </div>
  </div>
);

CourseCatalog.propTypes = {
  learningPath: PropTypes.objectOf(PropTypes.shape),
};

CourseCatalog.defaultProps = {
  learningPath: null,
};

export default CourseCatalog;

