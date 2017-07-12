import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';

import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { InfoCard, LinkCard } from '../shared/Cards';
import PageDivider from '../shared/PageDivider';

import { addBookmark, removeBookmark } from '../../actions/curriculumActions';
import { setCurrentPath } from '../../actions/userActions';

const handleStartClick = (pathId, dispatch) => () => dispatch(setCurrentPath(pathId));

const handleAddBookmarkClick = (pathId, dispatch) => () => dispatch(addBookmark(pathId, 'paths'));
const handleRemoveBookmarkClick = (pathId, dispatch) => () => dispatch(removeBookmark(pathId, 'paths'));

const Path = ({ match, curriculum, user, dispatch }) => {
  const pathId = match.params.id;
  const path = curriculum.paths[match.params.id];

  const courses = path.courseIds.map((courseId) => {
    const course = curriculum.courses[courseId];
    return <LinkCard item={course} linkTo={course.url} bgColorClass="bg-secondary" iconClass="fa-tasks" key={courseId} connectionClass="connected" />;
  });

  return (
    <div>
      <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__path" title={path.name}>
        {pathId === user.curPathId ?
          <BreadCrumbs rootNode={{ name: 'Current Path', url: '/dashboard' }} nodes={[path]} /> :
          <BreadCrumbs rootNode={{ name: 'Paths', url: '/library' }} nodes={[path]} />}
        <i className="fa fa-road c-white h0 abs-top-right" />
        {path.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      {user.authenticated ?
        <PageDivider>
          <button className="button--secondary" onClick={handleStartClick(pathId, dispatch)}>Start Path</button>
          <span className="normal h3">
            <i className="fa fa-tasks h3 c-secondary margin-right-tiny" />{path.nCompleted}/{path.nTotal}
          </span>
          {!path.bookmarked ?
            <button className="button--primary" onClick={handleAddBookmarkClick(pathId, dispatch)}>Bookmark Path</button> :
            <button className="button--secondary" onClick={handleRemoveBookmarkClick(pathId, dispatch)}>Remove Bookmark</button>}
        </PageDivider> :
        <PageDivider />}
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={path} bgColorClass="bg-primary" />
          </div>
          <div className="grid-half">
            {courses}
          </div>
        </div>
        {user.authenticated ? <hr /> : null}
        {user.authenticated ?
          <ReactDisqusThread
            shortname="devgaido"
            identifier={`/path-${pathId}`}
            title={path.name}
            url={undefined}
            category_id={undefined}
            onNewComment={null}
          /> : null}
      </div>
    </div>
  );
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Path;
