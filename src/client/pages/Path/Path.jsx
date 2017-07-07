import React from 'react';
import PropTypes from 'prop-types';
import ReactDisqusThread from 'react-disqus-thread';

import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { InfoCard, LinkCard } from '../shared/Cards';
import PageDivider from '../shared/PageDivider';

import { addBookmark, removeBookmark } from '../../actions/userActions';

const Path = ({ match, curriculum, user, dispatch }) => {
  const pathId = match.params.id;
  const path = curriculum.paths[match.params.id];
  const bookmarkId = `/paths/${pathId}`;

  const courses = path.courseIds.map((courseId) => {
    const course = curriculum.courses[courseId];
    return <LinkCard item={course} linkTo={`/paths/${pathId}/${courseId}`} bgColorClass="bg-secondary" iconClass="fa-tasks" key={courseId} connectionClass="connected" />;
  });

  return (
    <div>
      <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__path" title={path.name}>
        <BreadCrumbs curriculum={curriculum} pathId={match.params.id} />
        <i className="fa fa-road c-white h0 abs-top-right" />
        {path.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      <PageDivider>
        <button className="button--primary hidden">Bookmark Path</button>
        <span className="c-primary normal h3">Courses completed: {path.nCompleted}/{path.nTotal}</span>
        {user.bookmarkedItems.paths.indexOf(bookmarkId) === -1 ?
          <button className="button--primary" onClick={() => dispatch(addBookmark(bookmarkId, 'paths'))}>Bookmark Path</button> :
          <button className="button--secondary" onClick={() => dispatch(removeBookmark(bookmarkId, 'paths'))}>Remove Bookmark</button>}
      </PageDivider>
      <div className="container">
        <div className="row">
          <div className="grid-half">
            <InfoCard item={path} bgColorClass="bg-primary" />
          </div>
          <div className="grid-half">
            {courses}
          </div>
        </div>
        <hr />
        <ReactDisqusThread
          shortname="devgaido"
          identifier={`/path-${pathId}`}
          title={path.name}
          url={undefined}
          category_id={undefined}
          onNewComment={null}
        />
      </div>
    </div>
  );
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Path;
