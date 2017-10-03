import React from 'react';
import PropTypes from 'prop-types';

const OptionalLessonInfo = ({ lesson }) => {
  if (!(lesson.resources || lesson.instructions)) {
    return null;
  }
  return (
    <div className="flex flex-column-below-t margin-top-huge">
      <div className="width-50-above-t margin-right-small-above-t">
        <h4 className="center uppercase c-accent margin-bottom-tiny">Instructions</h4>
        <p className="no-margin">{lesson.instructions ? lesson.instructions : 'No instructions specified.'}</p>
      </div>
      <div className="width-50-above-t margin-top-big-below-t">
        <h4 className="center c-accent uppercase margin-bottom-tiny">Additional Resources</h4>
        <div className="flex-column items-center">
          {lesson.resources.map(
              (resource, index) =>
                <a key={index} href={resource[1]} target="_blank" rel="noopener noreferrer" className="no-margin">{resource[0]}</a>,
              )}
        </div>
      </div>
    </div>
  );
};

OptionalLessonInfo.propTypes = {
  lesson: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default OptionalLessonInfo;
