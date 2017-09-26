import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import PageHero from '../shared/PageHero';
import DisqusThread from '../shared/DisqusThread';
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

const typeIcons = {
  Book: 'icon-book',
  Course: 'icon-university',
  Project: 'icon-cogs',
};

const functionName = (user, lessonId) => {
  setCurrentPath(user.lastPathId);
  setLastTouchedLesson(lessonId);
};

const Subjects = ({ item }) => {
  const subjects = [];
  const numSubjects = Math.min(3, item.subjectNames.length);
  for (let i = 0; i < numSubjects; i += 1) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-text margin-left-tiny" key={item.name + item.subjectNames[i]}>{item.subjectNames[i]}</h5>);
  }
  if (item.subjectNames.length > 3) {
    subjects.push(<h5 className="tag border-round bg-light-grey c-tex margin-left-tiny" key={`${item.name}moreSubjects`}>{`... ${item.subjectNames.length - 2} more ...`}</h5>);
  }
  return (
    <div className="right">
      {subjects}
    </div>
  );
};

const Lesson = ({ match, curriculum, user, uiState }) => {
  const lessonId = match.params.id;
  const lesson = curriculum.lessons[lessonId];

  let resourceList = [['No additional resources required.', null]];
  if (lesson.resources !== undefined) {
    resourceList = lesson.resources;
  }
  const ratingStars = [];
  for (let i = 0; i < 5; i += 1) {
    if (i < lesson.rating) {
      ratingStars.push(<i className="fa icon-star c-accent h4 margin-left-tiny" key={lesson.name + i} />);
    } else {
      ratingStars.push(<i className="fa icon-star-o c-accent h4 margin-left-tiny" key={lesson.name + i} />);
    }
  }

  return (
    <div>
      <Helmet
        title={`Lesson: ${lesson.name}`}
        meta={[
          { name: 'description', content: lesson.description },
        ]}
      />
      <PageHero bgColorClass="bg-accent--dark" bgUrl={`/screenshots/${lessonId}.jpg`} title={lesson.name} subtitle={lesson.type} full>
        <i className={`fa ${typeIcons[lesson.type]} c-white h2 abs-top-right margin-top-small margin-right-small`} />
        {lesson.completed ? <i className="fa icon-check-circle-o c-white h1 abs-bottom-right margin-bottom-small margin-right-small" /> : null}
      </PageHero>
      <AnimateVisibleChildrenDiv className="container">
        <div className="flex bg-white padding-horizontal-big border-round margin-vertical-small page-hero__offset">
          <AnimateVisibleChildrenDiv className="padding-vertical-big">
            <div className="margin-top-big">
              <a href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={user.authenticated ? () => functionName(user, lessonId) : null}>
                <div className="preview overflow-hidden no-margin right border-round border-1px" style={{ background: `url(/screenshots/${lessonId}.jpg)`, backgroundSize: 'cover', borderColor: '#ccc' }} />
              </a>
            </div>
            <div className="flex padding-vertical-small">
              <div className="flex-1 margin-bottom-tiny">
                {ratingStars}
              </div>
              <div className="flex-2 margin-bottom-tiny">
                <h5 className="c-primary no-margin uppercase right">{lesson.estimatedTimeStr} hours</h5>
              </div>
            </div>
            <p>{lesson.description}</p>
            <div className="flex margin-left-0">
              <Subjects item={lesson} />
            </div>
            <div className="flex margin-top-big">
              <div className="flex-1">
                <h4 className="uppercase c-accent">Instructions</h4>
                <p>{lesson.instructions ? lesson.instructions : 'No instructions specified.'}</p>
              </div>
              <div className="flex-2">
                <h4 className="c-accent uppercase">Additional Resources</h4>
                {resourceList.map(
                    (resource, index) => <div key={index}>
                      <a href={resource[1]} target="_blank" rel="noopener noreferrer" className="no-margin">{resource[0]}</a>
                    </div>)}
              </div>
            </div>
            { user.authenticated ?
              <div className="margin-top-big flex justify-center">
                {!lesson.bookmarked ?
                  <button className="button--default uppercase" onClick={() => addBookmark(lessonId, 'lessons', lesson.version)}>
                    <div className="flex items-center">
                      <i className="fa icon-thumb-tack margin-right-tiny" />
                        Bookmark
                      </div>
                  </button> :
                  <button className="button--default uppercase" onClick={() => removeBookmark(lessonId, 'lessons', lesson.version)}>
                    <div className="flex items-center">
                      <i className="fa icon-remove margin-right-tiny" />
                        Remove Bookmark
                      </div>
                  </button>}
                <a className="button button--primary margin-left-small-above-t margin-bottom-small-below-t uppercase" href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={() => functionName(user, lessonId)}>
                  <div className="flex items-center">
                    <i className="fa icon-external-link margin-right-tiny" />
                      Open Lesson
                    </div>
                </a>
                {!lesson.completed ?
                  <button className="button--accent margin-left-small-above-t uppercase" onClick={() => { completeLesson(lessonId, lesson.version); toggleModal(); functionName(user, lessonId); }}>
                    <div className="flex items-center">
                      <i className="fa icon-check-square-o margin-right-tiny" />
                        Complete Lesson
                      </div>
                  </button> :
                  <button className="button--accent margin-left-small-above-t uppercase" onClick={() => unCompleteLesson(lessonId, lesson.version)}>
                    <div className="flex items-center">
                      <i className="fa icon-remove margin-right-tiny" />
                        Un-Complete Lesson
                      </div>
                  </button>}
                { uiState.showModal ? <Modal /> : null }
              </div> :
              <div className="margin-top-huge flex justify-center-below-t">
                <a className="button button--primary uppercase" href={lesson.externalSource} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center">
                    <i className="fa icon-external-link margin-right-tiny" />
                      Open Lesson
                    </div>
                </a>
              </div> }
          </AnimateVisibleChildrenDiv>
        </div>
      </AnimateVisibleChildrenDiv>
      <div className="container margin-top-huge">
        {user.authenticated ? <hr /> : null}
        {user.authenticated ?
          <DisqusThread
            id={`/lesson-${lessonId}`}
            title={lesson.name}
            path={lesson.url}
          /> : null}
      </div>
    </div>
  );
};

Lesson.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
  curriculum: store.curriculum,
  uiState: store.uiState,
}))(Lesson);
