import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import PageHero from '../shared/PageHero';
import DisqusThread from '../shared/DisqusThread';

import BigLessonCard from '../shared/Cards/BigLessonCard/BigLessonCard';

const typeIcons = {
  Book: 'icon-book',
  Course: 'icon-university',
  Project: 'icon-cogs',
};

const Lesson = ({ match, curriculum, user }) => {
  const lessonId = match.params.id;
  const lesson = curriculum.lessons[lessonId];

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
      <BigLessonCard lesson={lesson} />
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
};

export default connect(store => ({
  user: store.user,
  curriculum: store.curriculum,
}))(Lesson);
