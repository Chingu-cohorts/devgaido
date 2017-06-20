import React from 'react';
import PropTypes from 'prop-types';

const learningPathItem = props => (
  <div className={`grid-quarter card ${props.type}`} key={props.key}>
    <div className="card-header">
      <i className={props.category} />
      <i className={props.type} />
    </div>
    <span className="learning-path-category">{props.type}</span>
    <h3 className="card-name">{props.name}</h3>
    <ul>
      <li className="card-subject">{props.subject}</li>
      <li className="card-category">{props.description}</li>
    </ul>
    <div className="card-footer">
      <a className="view-item" href="/">View</a>
      <i className={props.name} />
    </div>
  </div>
  );
/*
const detailedPathItem = props => (
  <div className="grid-third card">
    <h3 className="card-name">{props['Lesson Name']}</h3>
    <p className="card-subject">{props.Subject}</p>
    <p className="card-category">Category: {props.Category}</p>
    <p className="card-type">{props.Type}</p>
    <p className="card-source">{props.Source}</p>
    <p className="card-ext-source">{props['External Source']}</p>
    <p className="card-seq-num">{props['Sequence #']}</p>
  </div>
  );
*/
const LearningPath = ({ lessons }) => {
  const items = Object.keys(lessons).map(
    itemIndex => learningPathItem({ ...lessons[itemIndex], key: itemIndex }),
  );
  return (
    <div className="container-flex cards">
      {items}
      {/* <div className="learningPathItemDetails">
        {detailedPathItem(detailedLesson)}
      </div> */}
    </div>
  );
};

learningPathItem.propTypes = {
  category: PropTypes.string.isRequired,
  key: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  subject: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
/*
detailedPathItem.propTypes = {
  Category: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired,
  Subject: PropTypes.string.isRequired,
  Source: PropTypes.string.isRequired,
  'Sequence #': PropTypes.string.isRequired,
  'Lesson Name': PropTypes.string.isRequired,
  'External Source': PropTypes.string.isRequired,
}; */

LearningPath.propTypes = {
  lessons: PropTypes.oneOfType(
    [PropTypes.arrayOf(PropTypes.shape), PropTypes.objectOf(PropTypes.shape)],
  ).isRequired,
};

export default LearningPath;
