import React from 'react';
import PropTypes from 'prop-types';

import StateProvider from '../../../shared/StateProvider';

const SubjectTags = ({ item, setState, state }) => {
  const subjects = [];
  let numSubjects = 0;
  if (state.tagIsOpened) {
    numSubjects = item.subjectNames.length;
  } else {
    numSubjects = Math.min(5, item.subjectNames.length);
  }
  for (let i = 0; i < numSubjects; i += 1) {
    subjects.push(<h6 className="tag normal border-pill bg-grey c-white " key={item.name + item.subjectNames[i].name + i}>{item.subjectNames[i]}</h6>);
  }
  if (item.subjectNames.length > 5) {
    const subjectNumberDiff = item.subjectNames.length - 5;
    subjects.push(
      <button
        key={`${item.name}moreSubjects`}
        className="h6 border-round border-none bg-hover-accent transition-fast bg-grey c-white c-hover-white "
        onClick={() => {
          setState({
            tagIsOpened: !state.tagIsOpened,
          });
        }}
      >
        <div className="flex items-center">
          {state.tagIsOpened ? '<<' : `and ${subjectNumberDiff} more ...`}
        </div>
      </button>,
    );
  }
  return (
    <div className="left center flex items-center flex-wrap">
      {subjects}
    </div>
  );
};

SubjectTags.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  state: PropTypes.objectOf(PropTypes.shape).isRequired,
  setState: PropTypes.func.isRequired,
};

export default StateProvider(SubjectTags, {
  tagIsOpened: false,
}, {});
