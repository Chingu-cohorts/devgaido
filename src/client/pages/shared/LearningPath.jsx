import React from 'react';
import PropTypes from 'prop-types';

const learningPathItem = props => (
  <div className={`grid-quarter learning-path-item ${props.Category}`} key={props.index}>
    <div className="learning-path-item-header">
      <i className={props.Category} />
      <i className={props.Type} />
    </div>
    <span className="learning-path-category">{props.Category}</span>
    <h3 className="learning-path-item-name">{props['Lesson Name']}</h3>
    <ul>
      <li className="learning-path-item-subject">{props.Subject}</li>
      <li className="learning-path-item-category">Category: {props.Category}</li>
      <li className="learning-path-item-type">{props.Type}</li>
    </ul>
    <div className="learning-path-item-footer">
      <a className="view-item" href="/">View</a>
      <i className={props['Lesson Name']} />
    </div>
  </div>
  );
/*
const detailedPathItem = props => (
  <div className="grid-third learning-path-item">
    <h3 className="learning-path-item-name">{props['Lesson Name']}</h3>
    <p className="learning-path-item-subject">{props.Subject}</p>
    <p className="learning-path-item-category">Category: {props.Category}</p>
    <p className="learning-path-item-type">{props.Type}</p>
    <p className="learning-path-item-source">{props.Source}</p>
    <p className="learning-path-item-ext-source">{props['External Source']}</p>
    <p className="learning-path-item-seq-num">{props['Sequence #']}</p>
  </div>
  );
*/
const LearningPath = ({ lessons }) => {
  const items = lessons.map((item, index) => learningPathItem({ ...item, index }));
  return (
    <div className="container-flex learning-path-items">
      {items}
      {/* <div className="learningPathItemDetails">
        {detailedPathItem(detailedLesson)}
      </div> */}
    </div>
  );
};

learningPathItem.propTypes = {
  Category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  Type: PropTypes.string.isRequired,
  Subject: PropTypes.string.isRequired,
  'Lesson Name': PropTypes.string.isRequired,
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
  lessons: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default LearningPath;
