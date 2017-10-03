import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Modal from '../../../shared/Modal';

import BigCard from '../shared/BigCard';
import BookmarkButton from '../shared/BookmarkButton';
import RatingStars from '../shared/RatingStars';
import SubjectTags from '../shared/SubjectTags';
import OptionalLessonInfo from './OptionalLessonInfo';

import LessonPreviewImage from './LessonPreviewImage';

import CompleteButton from './CompleteButton';
import OpenButton from './OpenButton';

const BigLessonCard = ({ lesson, user, uiState }) => (
  <BigCard>
    <LessonPreviewImage lesson={lesson} user={user} />
    <div className="flex margin-bottom-small">
      <RatingStars item={lesson} />
      <div className="flex-2 margin-bottom-tiny">
        <h5 className="c-primary no-margin uppercase right">{lesson.estimatedTimeStr} hours</h5>
      </div>
    </div>
    <p className="no-margin">{lesson.description}</p>
    <OptionalLessonInfo lesson={lesson} />
    <div className="margin-top-big flex flex-wrap-below-t justify-center">
      { user.authenticated ? <BookmarkButton item={lesson} type="lesson" key="BookmarkButton" /> : null}
      <OpenButton lesson={lesson} user={user} />
      { user.authenticated ? <CompleteButton lesson={lesson} user={user} /> : null}
      { user.authenticated && uiState.showModal ? <Modal /> : null}
    </div>
    <div className="flex margin-top-huge">
      <SubjectTags item={lesson} />
    </div>
  </BigCard>
);

BigLessonCard.propTypes = {
  lesson: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
  uiState: store.uiState,
}))(BigLessonCard);
