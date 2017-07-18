import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { InfoCard, PreviewCard } from '../shared/Cards';
import PageDivider from '../shared/PageDivider';
import DisqusThread from '../shared/DisqusThread';

import { addBookmark, removeBookmark, completeLesson } from '../../actions/curriculumActions';

const handleCompleteClick = (lessonId, version, dispatch) => () => dispatch(completeLesson(lessonId, version));

const handleAddBookmarkClick = (lessonId, version, dispatch) => () => dispatch(addBookmark(lessonId, 'lessons', version));
const handleRemoveBookmarkClick = (lessonId, version, dispatch) => () => dispatch(removeBookmark(lessonId, 'lessons', version));

const Lesson = ({ match, curriculum, user, dispatch }) => {
  const lessonId = match.params.id;
  const lesson = curriculum.lessons[lessonId];
  const subjects = lesson.subjects.map(subjectId => curriculum.subjects[subjectId]);

  let pathId = null;
  let courseId = null;
  let path = null;
  let course = null;
  if (lesson.parentPathIds.indexOf(user.curPathId) !== -1) {
    pathId = user.curPathId;
    path = curriculum.paths[pathId];
    path.courseIds.forEach((_courseId) => {
      if (lesson.parentCourseIds.indexOf(_courseId) !== -1) {
        courseId = _courseId;
        course = curriculum.courses[courseId];
      }
    });
  }

  let projectInstructions = 'N/a';
  if (lesson.instructions !== undefined) {
    projectInstructions = lesson.instructions;
  }

  let resourceList = [['N/a', null]];
  if (lesson.resources !== undefined) {
    resourceList = lesson.resources;
  }

  return (
    <div>
      <Helmet
        title={`Lesson: ${lesson.name}`}
        meta={[
          { name: 'description', content: lesson.description },
        ]}
      />
      <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__path" title={lesson.name}>
        {pathId ?
          <BreadCrumbs rootNode={{ name: 'Current Path', url: '/dashboard' }} nodes={[path, course, lesson]} /> :
          <BreadCrumbs rootNode={{ name: 'Lessons', url: '/library' }} nodes={[lesson]} />}
        <i className="fa fa-graduation-cap c-white h0 abs-top-right" />
        {lesson.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      {user.authenticated ?
        <PageDivider>
          <button className="button--primary hidden">Bookmark Lesson</button>
          <div className="flex width-100 justify-center">
            <a className="button button--secondary" href={lesson.externalSource} target="_blank" rel="noopener noreferrer">START LESSON</a>
            <button className="button--primary margin-left-small" onClick={handleCompleteClick(lessonId, lesson.version, dispatch)}>COMPLETE LESSON</button>
          </div>
          {!lesson.bookmarked ?
            <button className="button--primary" onClick={handleAddBookmarkClick(lessonId, lesson.version, dispatch)}>Bookmark Lesson</button> :
            <button className="button--secondary" onClick={handleRemoveBookmarkClick(lessonId, lesson.version, dispatch)}>Remove Bookmark</button>}
        </PageDivider> :
        <PageDivider />}
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={lesson} bgColorClass="bg-primary">
              <h5 className="no-margin"><strong>Length: </strong></h5>
              <p className="no-margin margin-left-small">{lesson.estimatedTime.charAt(0).toUpperCase()+lesson.estimatedTime.slice(1)}</p>
              <h5 className="no-margin"><strong>Subjects: </strong></h5>
              {subjects.map(
                subject => <div key={subject.name}>
                  <p className="no-margin margin-left-small">{subject.description}</p>
                </div>)}
              <div className="h5 no-margin"><strong>Instructions: </strong></div>
              <p className="no-margin margin-left-small">{projectInstructions}</p>
              <h5 className="no-margin"><strong>Resources: </strong></h5>
              {resourceList.map(
                resource => <div key={resource[0]}>
                  <a href={resource[1]} target="_blank" rel="noopener noreferrer" className="no-margin margin-left-small">{resource[0]}</a>
                </div>)}
            </InfoCard>
          </div>
          <div className="grid-half">
            <PreviewCard bgColorClass="bg-secondary">
              <img className="preview-img" src={`/screenshots/${lessonId}.jpg`} alt={lesson.name} />
            </PreviewCard>
          </div>
        </div>
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
  dispatch: PropTypes.func.isRequired,
};

export default Lesson;
