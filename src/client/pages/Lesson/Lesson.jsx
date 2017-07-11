import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';

import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { InfoCard, PreviewCard } from '../shared/Cards';
import PageDivider from '../shared/PageDivider';

import { addBookmark, removeBookmark, completeLesson } from '../../actions/curriculumActions';

const handleCompleteClick = (lessonId, dispatch) => () => dispatch(completeLesson(lessonId));

const handleAddBookmarkClick = (lessonId, dispatch) => () => dispatch(addBookmark(lessonId, 'lessons'));
const handleRemoveBookmarkClick = (lessonId, dispatch) => () => dispatch(removeBookmark(lessonId, 'lessons'));

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

  return (
    <div>
      <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__path" title={lesson.name}>
        {pathId ?
          <BreadCrumbs rootNode={{ name: 'Current Path', url: '/dashboard' }} nodes={[path, course, lesson]} /> :
          <BreadCrumbs rootNode={{ name: 'Lessons', url: '/library' }} nodes={[lesson]} />}
        <i className="fa fa-graduation-cap c-white h0 abs-top-right" />
        {lesson.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      <PageDivider>
        <button className="button--primary hidden">Bookmark Lesson</button>
        <div className="flex width-100 justify-center">
          <a className="button button--secondary" href={lesson.externalSource} target="_blank" rel="noopener noreferrer">START LESSON</a>
          <button className="button--primary margin-left-small" onClick={handleCompleteClick(lessonId, dispatch)}>COMPLETE LESSON</button>
        </div>
        {!lesson.bookmarked ?
          <button className="button--primary" onClick={handleAddBookmarkClick(lessonId, dispatch)}>Bookmark Lesson</button> :
          <button className="button--secondary" onClick={handleRemoveBookmarkClick(lessonId, dispatch)}>Remove Bookmark</button>}
      </PageDivider>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={lesson} bgColorClass="bg-primary">
              {subjects.map(
                subject => <div key={subject.name}>
                  <p>{subject.name}</p>
                  <p>{subject.description}</p>
                </div>)}
            </InfoCard>
          </div>
          <div className="grid-half">
            <PreviewCard bgColorClass="bg-secondary">
              <img className="preview-img" src={`/screenshots/${lessonId}.jpeg`} alt={lesson.name} />
            </PreviewCard>
          </div>
        </div>
        <hr />
        <ReactDisqusThread
          shortname="devgaido"
          identifier={`/lesson-${lessonId}`}
          title={lesson.name}
          url={undefined}
          category_id={undefined}
          onNewComment={null}
        />
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
