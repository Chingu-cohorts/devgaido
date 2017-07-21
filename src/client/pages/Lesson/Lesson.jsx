import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { InfoCard, PreviewCard } from '../shared/Cards';
import PageDivider from '../shared/PageDivider';
import DisqusThread from '../shared/DisqusThread';

import actions from '../../actions';

const { addBookmark, removeBookmark, completeLesson, unCompleteLesson } = actions;

const Lesson = ({ match, curriculum, user }) => {
  const lessonId = match.params.id;
  const lesson = curriculum.lessons[lessonId];
  const subjects = lesson.subjects.map(subjectId => curriculum.subjects[subjectId]);

  let pathId = null;
  let courseId = null;
  let path = null;
  let course = null;
  /*if (lesson.parentPathIds.indexOf(user.curPathId) !== -1) {
    pathId = user.curPathId;
    path = curriculum.paths[pathId];
    path.courseIds.forEach((_courseId) => {
      if (lesson.parentCourseIds.indexOf(_courseId) !== -1) {
        courseId = _courseId;
        course = curriculum.courses[courseId];
      }
    });
  }*/

  let projectInstructions = 'N/a';
  if (lesson.instructions !== undefined) {
    projectInstructions = lesson.instructions;
  }

  let resourceList = [['No additional resources required.', null]];
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
      <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__path" bgUrl={`/screenshots/${lessonId}.jpg`} title={lesson.name}>
        {pathId ?
          <BreadCrumbs rootNode={{ name: 'Current Path', url: '/dashboard' }} nodes={[path, course, lesson]} /> :
          <BreadCrumbs rootNode={{ name: 'Lessons', url: '/library' }} nodes={[lesson]} />}
        <i className="fa fa-graduation-cap c-white h0 abs-top-right" />
        {lesson.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      {/* user.authenticated ?
        <PageDivider>
          <button className="button--primary hidden">Bookmark Lesson</button>
          <div className="flex width-100 justify-center">
            <a className="button button--secondary" href={lesson.externalSource} target="_blank" rel="noopener noreferrer">START LESSON</a>
            {!lesson.completed ?
              <button className="button--primary margin-left-small" onClick={() => completeLesson(lessonId, lesson.version)}>COMPLETE LESSON</button> :
              <button className="button--secondary margin-left-small" onClick={() => unCompleteLesson(lessonId, lesson.version)}>UNCOMPLETE LESSON</button>}
          </div>
          {!lesson.bookmarked ?
            <button className="button--primary" onClick={() => addBookmark(lessonId, 'lessons', lesson.version)}>Bookmark Lesson</button> :
            <button className="button--secondary" onClick={() => removeBookmark(lessonId, 'lessons', lesson.version)}>Remove Bookmark</button>}
        </PageDivider> : null */}
      <div className="bg-white margin-bottom-small">
        <div className="container flex">
          <div className="padding-vertical-big flex-1 flex-column">
            <h2>About This Lesson</h2>
            <p className="h5">{lesson.description}</p>
            <h4 className="margin-top-big">INSTRUCTIONS</h4>
            <p>{lesson.instructions ? lesson.instructions : 'No instructions specified.'}</p>
            <h4 className="margin-top-big">ADDITIONAL RESOURCES</h4>
            {resourceList.map(
              resource => <div key={resource[0]}>
                <a href={resource[1]} target="_blank" rel="noopener noreferrer" className="no-margin">{resource[0]}</a>
              </div>)}
            <div className="margin-top-huge flex flex-1 align-items-end">
              <button className="button--secondary uppercase margin-right-small">Open Lesson</button>
            </div>
          </div>
          <div className="padding-vertical-big margin-left-big">
            <div className="right margin-bottom-big">
              <button className="button--default uppercase">Bookmark</button>
            </div>
            <div className="flex justify-space-between">
              <h5 className="normal">Rating</h5>
              <div>
                <i className="fa fa-star c-secondary h4 margin-left-tiny" />
                <i className="fa fa-star c-secondary h4 margin-left-tiny" />
                <i className="fa fa-star c-secondary h4 margin-left-tiny" />
                <i className="fa fa-star c-secondary h4 margin-left-tiny" />
              </div>
            </div>
            <div className="flex justify-space-between">
              <h5 className="normal margin-right-huge">Estimated Length</h5>
              <div>
                <h4 className="c-primary uppercase right no-margin">Very Long</h4>
                <h5 className="c-primary uppercase right">(> 100 hours)</h5>
              </div>
            </div>
            <div className="flex justify-space-between">
              <h5 className="normal">Tags</h5>
              <div className="width-50 right">
                <h6 className="tag c-white bg-primary center border-pill display-inline-block">HTML</h6>
                <h6 className="tag c-white bg-primary center border-pill display-inline-block">Javascript</h6>
                <h6 className="tag c-white bg-primary center border-pill display-inline-block">MongoDB</h6>
                <h6 className="tag c-white bg-primary center border-pill display-inline-block">CSS</h6>
              </div>
            </div>
            <div className="flex-column margin-top-big">
              <h5 className="normal">Preview</h5>
              <div className="preview overflow-hidden no-margin right border-round border-1px" style={{ background: `url(/screenshots/${lessonId}.jpg)`, backgroundSize: 'cover' }} />
            </div>
          </div>
        </div>
      </div>
      {/*<div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={lesson} bgColorClass="bg-primary">
              <h5 className="no-margin"><strong>Length: </strong></h5>
              <p className="no-margin margin-left-small">{lesson.estimatedTime.charAt(0).toUpperCase() + lesson.estimatedTime.slice(1)}</p>
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
      </div>*/}
    </div>
  );
};

Lesson.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Lesson;