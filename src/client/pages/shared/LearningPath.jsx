import React from 'react';
import learningPath from '../../../server/models/learningpath.json';

let detailedLesson = learningPath[0];

const handleClick = (e, props) => {
  // We cannot preventDefault() here because that makes it so we have no rerender on click.
  // With proper state management this should be easy.
  detailedLesson = props;
  // e.preventDefault();
};

const learningPathItem = props => (
  <a href="#" onClick={e => handleClick(e, props)} >
    <div className="learningPathItem">
      <h3 className="learningPathItemName">{props['Lesson Name']}</h3>
      <p className="learningPathItemSubject">{props.Subject}</p>
      <p className="learningPathItemCategory">Category: {props.Category}</p>
      <p className="learningPathItemType">{props.Type}</p>
    </div>
  </a>
  );

const detailedPathItem = props => (
  <div className="learningPathItem">
    <h3 className="learningPathItemName">{props['Lesson Name']}</h3>
    <p className="learningPathItemSubject">{props.Subject}</p>
    <p className="learningPathItemCategory">Category: {props.Category}</p>
    <p className="learningPathItemType">{props.Type}</p>
    <p className="learningPathItemSource">{props.Source}</p>
    <p className="learningPathItemExtSource">{props['External Source']}</p>
    <p className="learningPathItemSeqNum">{props['Sequence #']}</p>
  </div>
  );

const LearningPath = () => {
  const items = learningPath.map((item, index) => learningPathItem({ ...item, index }));
  return (
    <div className="learningPathContainer">
      <ul className="learningPath">
        {items}
      </ul>
      <div className="learningPathItemDetails">
        {detailedPathItem(detailedLesson)}
      </div>
    </div>
  );
};

export default LearningPath;
