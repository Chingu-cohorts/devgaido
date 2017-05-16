import React from 'react';
// TODO: Remove the learningpath.json file and instead pass a JSON object in props from CourseCatalog.jsx containing the filtered lessons to be displayed.
import learningPath from '../../../server/models/learningpath.json';

let detailedLesson = learningPath[0];

const handleClick = (e, props) => {
  // We cannot preventDefault() here because that makes it so we have no rerender on click.
  // With proper state management this should be easy.
  detailedLesson = props;
  // e.preventDefault();
};

const learningPathItem = props => (
  <div className={`grid-quarter learning-path-item ${  props.Category}`} key={props["Sequence #"]}>
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
        <a className="view-item" href="#" onClick={e => handleClick(e, props)} >View</a>
        <i className={props['Lesson Name']} />
      </div>
  </div>
  );

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

const LearningPath = ({ learninPath }) => {
  const items = learningPath.map((item, index) => learningPathItem({ ...item, index }));
  return (
    <div className="container-flex learning-path-items">
      {items}
      <div className="learningPathItemDetails">
        {detailedPathItem(detailedLesson)}
      </div>
    </div>
  );
};

export default LearningPath;
