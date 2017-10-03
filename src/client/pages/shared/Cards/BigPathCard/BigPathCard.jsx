import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import BigCard from '../shared/BigCard';
import BookmarkButton from '../shared/BookmarkButton';
import RatingStars from '../shared/RatingStars';
import SubjectTags from '../shared/SubjectTags';

import PathImage from './PathImage';
import OptionalPathInfo from './OptionalPathInfo';

const BigPathCard = ({ path, user }) => (
  <BigCard>
    <PathImage path={path} />
    <div className="flex margin-bottom-small">
      <RatingStars item={path} />
      <div className="flex-2 margin-bottom-tiny">
        <h5 className="c-primary no-margin uppercase right">{path.estimatedTimeStr} hours</h5>
      </div>
    </div>
    <p className="no-margin">{path.description}</p>
    <OptionalPathInfo path={path} />
    <div className="margin-top-big flex flex-wrap-below-t justify-center">
      { user.authenticated ? <BookmarkButton item={path} type="path" key="BookmarkButton" /> : null}
    </div>
    <div className="flex margin-top-huge">
      <SubjectTags item={path} />
    </div>
  </BigCard>
);

BigPathCard.propTypes = {
  path: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
  curriculum: store.curriculum,
}))(BigPathCard);
