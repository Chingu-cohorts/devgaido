import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../shared/Modal';
import AnimateVisibleChildrenDiv from '../shared/AnimateVisibleChildrenDiv';

import actions from '../../actions';

const {
  setCurrentPath,
  setLastTouchedLesson,
  addBookmark,
  removeBookmark,
  completeLesson,
  unCompleteLesson,
  toggleModal,
} = actions;

const functionName = (user, lessonId) => {
  setCurrentPath(user.lastPathId);
  setLastTouchedLesson(lessonId);
};

const Subjects = ({ item }) => {
  const subjects = [];
  const numSubjects = Math.min(3, item.subjectNames.length);
  for (let i = 0; i < numSubjects; i += 1) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-text margin-right-tiny" key={item.name + item.subjectNames[i]}>{item.subjectNames[i]}</h5>);
  }
  if (item.subjectNames.length > 3) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-tex margin-right-tiny" key={`${item.name}moreSubjects`}>{`... ${item.subjectNames.length - 2} more ...`}</h5>);
  }
  return (
    <div className="right">
      {subjects}
    </div>
  );
};

const RatingStars = ({ item }) => {
  const ratingStars = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < item.rating) {
      ratingStars.push(<i className="fa icon-star c-accent h4 margin-right-tiny" key={item.name + i} />);
    } else {
      ratingStars.push(<i className="fa icon-star-o c-accent h4 margin-right-tiny" key={item.name + i} />);
    }
  }
  return (
    <div className="flex-1 no-margin">
      {ratingStars}
    </div>
  );
};


const OptionalInfo = (lesson) => {
  let resourceList = [['No additional resources required.', null]];
  if (lesson.resources !== undefined) {
    resourceList = lesson.resources;
  }
  return (
    <div className="flex margin-top-huge">
      <div className="width-50 margin-right-small">
        <h4 className="center uppercase c-accent margin-bottom-tiny">Instructions</h4>
        <p className="no-margin">{lesson.instructions ? lesson.instructions : 'No instructions specified.'}</p>
      </div>
      <div className="width-50">
        <h4 className="center c-accent uppercase margin-bottom-tiny">Additional Resources</h4>
        <div className="flex-column items-center">
          {resourceList.map(
              (resource, index) =>
                <a key={index} href={resource[1]} target="_blank" rel="noopener noreferrer" className="no-margin">{resource[0]}</a>,
              )}
        </div>
      </div>
    </div>
  );
};

const BookmarkButton = ({ item, type }) => (!item.bookmarked ?
  <button className="button--default uppercase width-100-below-t margin-right-small-above-t margin-bottom-small-below-t" onClick={() => addBookmark(item.id, type, item.version)}>
    <div className="flex items-center justify-center">
      <i className="fa icon-thumb-tack margin-right-tiny" />
        Bookmark
      </div>
  </button> :
  <button className="button--default uppercase width-100-below-t margin-right-small-above-t margin-bottom-small-below-t" onClick={() => removeBookmark(item.id, type, item.version)}>
    <div className="flex items-center justify-center">
      <i className="fa icon-remove margin-right-tiny" />
        Remove Bookmark
      </div>
  </button>);

const CompleteLessonButton = ({ lesson, user }) => (!lesson.completed ?
  <button className="button--accent width-100-below-t margin-right-small-above-t uppercase" onClick={() => { completeLesson(lesson.id, lesson.version); toggleModal(); functionName(user, lesson.id); }}>
    <div className="flex items-center justify-center">
      <i className="fa icon-check-square-o margin-right-tiny" />
        Complete Lesson
      </div>
  </button> :
  <button className="button--accent width-100-below-t margin-right-small-above-t uppercase" onClick={() => unCompleteLesson(lesson.id, lesson.version)}>
    <div className="flex items-center justify-center">
      <i className="fa icon-remove margin-right-tiny" />
        Un-Complete Lesson
      </div>
  </button>);

const OpenLessonButton = ({ lesson, user }) => {
  const handleOnClick = user ? () => functionName(user, lesson.id) : null;
  return (
    <a className="button button--primary width-100-below-t margin-right-small-above-t margin-bottom-small-below-t uppercase" href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={handleOnClick}>
      <div className="flex items-center justify-center">
        <i className="fa icon-external-link margin-right-tiny" />
          Open Lesson
        </div>
    </a>
  );
};

const BigCard = ({ item, type, user, uiState }) => {
  const lesson = (type === 'lesson') ? item : null;
  const lessonId = lesson ? lesson.id : null;

  return (
    <AnimateVisibleChildrenDiv dontTriggerOnUpdate className="container">
      <div className="flex width-100 bg-white padding-horizontal-big padding-vertical-big border-round margin-bottom-small page-hero__offset">
        <AnimateVisibleChildrenDiv dontTriggerOnUpdate className="width-100">
          <div className="margin-bottom-big">
            <a href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={user.authenticated ? () => functionName(user, lessonId) : null}>
              <div className="preview border-round" style={{ background: `url(/screenshots/${lessonId}.jpg)`, backgroundSize: 'cover', borderColor: '#ccc' }} />
            </a>
          </div>
          <div className="flex margin-bottom-small">
            <RatingStars item={item} />
            <div className="flex-2 margin-bottom-tiny">
              <h5 className="c-primary no-margin uppercase right">{lesson.estimatedTimeStr} hours</h5>
            </div>
          </div>
          <p className="no-margin">{lesson.description}</p>
          { (lesson.resources !== undefined || lesson.instructions !== undefined) ? OptionalInfo(lesson) : null }
          <div className="margin-top-big flex flex-wrap-below-t justify-center">
            { user.authenticated ? [
              <BookmarkButton item={item} type={type} key="BookmarkButton" />,
              (type === 'lesson' ? [
                <OpenLessonButton lesson={item} user={user} />,
                <CompleteLessonButton lesson={item} user={user} />,
                (uiState.showModal ? <Modal /> : null),
              ] : null),
            ] : <OpenLessonButton lesson={item} />}
          </div>
          <div className="flex margin-top-huge">
            <Subjects item={lesson} />
          </div>
        </AnimateVisibleChildrenDiv>
      </div>
    </AnimateVisibleChildrenDiv>
  );
};

export default connect(store => ({
  user: store.user,
  curriculum: store.curriculum,
  uiState: store.uiState,
}))(BigCard);
