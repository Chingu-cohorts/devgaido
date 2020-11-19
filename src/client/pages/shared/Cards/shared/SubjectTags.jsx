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
    subjects.push(<h5 className="tag border-round bg-light-grey c-text margin-right-tiny" key={item.name + item.subjectNames[i].name + i}>{item.subjectNames[i]}</h5>);
  }
  if (item.subjectNames.length > 5) {
    subjects.push(
      <button
        key={`${item.name}moreSubjects`}
        className="border-round border-none bg-hover-accent transition-fast bg-light-grey c-text c-hover-white margin-top-tiny"
        onClick={() => {
          setState({
            tagIsOpened: !state.tagIsOpened,
          });
        }}
      >
        <div className="flex items-center">
          {state.tagIsOpened ? '<<' : '...'}
        </div>
      </button>,
    );
  }
  return (
    <div className="left center">
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
