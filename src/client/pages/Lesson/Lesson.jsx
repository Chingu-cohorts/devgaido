import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import PageHero from '../shared/PageHero';
import DisqusThread from '../shared/DisqusThread';

import actions from '../../actions';

const {
  setCurrentPath,
  setLastTouchedLesson,
  addBookmark,
  removeBookmark,
  completeLesson,
  unCompleteLesson,
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

const Lesson = ({ match, curriculum, user }) => {
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
  const subjects = [];
  const numSubjects = Math.min(2, lesson.subjectNames.length);
  for (let i = 0; i < numSubjects; i += 1) {
    subjects.push(lesson.subjectNames[i]);
  }
  if (lesson.subjectNames.length > 2) {
    subjects.push(`... ${lesson.subjectNames.length - 2} more ...`);
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
        <i className={`fa ${typeIcons[lesson.type]} c-white h0 abs-top-right margin-top-small margin-right-small`} />
        {lesson.completed ? <i className="fa icon-check-circle-o c-white h0 abs-bottom-right margin-bottom-small margin-right-small" /> : null}
      </PageHero>
      <div className="container">
        <div className="flex bg-white padding-horizontal-big border-round margin-vertical-small page-hero__offset">
          <div className="padding-vertical-big flex-2 flex-column">
            <h2 className="c-primary">About This Lesson</h2>
            <p>{lesson.description}</p>
            <h4 className="margin-top-big uppercase c-accent">Instructions</h4>
            <p>{lesson.instructions ? lesson.instructions : 'No instructions specified.'}</p>
            <h4 className="margin-top-big c-accent">Additional Resources</h4>
            {resourceList.map(
              (resource, index) => <div key={index}>
                <a href={resource[1]} target="_blank" rel="noopener noreferrer" className="no-margin">{resource[0]}</a>
              </div>)}
            { user.authenticated ?
              <div className="margin-top-huge flex flex-1 items-end">
                <a className="button button--primary uppercase" href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={() => functionName(user, lessonId)}>Open Lesson</a>
                {!lesson.completed ?
                  <button className="button--accent margin-left-small uppercase" onClick={() => { completeLesson(lessonId, lesson.version); functionName(user, lessonId); }}>Complete Lesson</button> :
                  <button className="button--primary margin-left-small uppercase" onClick={() => unCompleteLesson(lessonId, lesson.version)}>Un-Complete Lesson</button>}
              </div> :
              <div className="margin-top-huge flex flex-1 items-end">
                <a className="button button--accent uppercase" href={lesson.externalSource} target="_blank" rel="noopener noreferrer">Open Lesson</a>
              </div> }
          </div>
          <div className="padding-vertical-big margin-left-big flex-1">
            { user.authenticated ?
              <div className="right margin-bottom-big">
                {!lesson.bookmarked ?
                  <button className="button--default uppercase" onClick={() => addBookmark(lessonId, 'lessons', lesson.version)}>Bookmark</button> :
                  <button className="button--default uppercase" onClick={() => removeBookmark(lessonId, 'lessons', lesson.version)}>Remove Bookmark</button>}
              </div> :
              <div className="right margin-bottom-big">
                <button className="button--default uppercase hidden">Bookmark</button>
              </div> }
            <div className="flex justify-between">
              <h5 className="normal">Rating</h5>
              <div>
                {ratingStars}
              </div>
            </div>
            <div className="flex justify-between">
              <h5 className="normal margin-right-huge">Estimated Length</h5>
              <div>
                {/* <h4 className="c-primary uppercase right no-margin">Very Long</h4>*/}
                <h5 className="c-primary uppercase right">{lesson.estimatedTimeStr} hours</h5>
              </div>
            </div>
            <div className="flex justify-between">
              <h5 className="normal">Tags</h5>
              <div className="width-50 right">
                {subjects.map(
                  subjectName => <h6 className="tag center c-white border-pill bg-grey display-inline-block" key={lesson.name + subjectName}>{subjectName}</h6>,
                )}
              </div>
            </div>
            <div className="flex-column margin-top-big">
              <a href={lesson.externalSource} target="_blank" rel="noopener noreferrer" onClick={user.authenticated ? () => functionName(user, lessonId) : null}>
                <div className="preview overflow-hidden no-margin right border-round border-1px" style={{ background: `url(/screenshots/${lessonId}.jpg)`, backgroundSize: 'cover', borderColor: '#ccc' }} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
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
};

export default connect(store => ({
  user: store.user,
  curriculum: store.curriculum,
}))(Lesson);
