import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import MilestoneCard from './MilestoneCard';
import PageHero from '../shared/PageHero';
import BreadCrumbs from '../shared/BreadCrumbs';
import { InfoCard, LinkCard } from '../shared/Cards';
import PageDivider from '../shared/PageDivider';
import DisqusThread from '../shared/DisqusThread';

import actions from '../../actions';

const { setCurrentPath, addBookmark, removeBookmark } = actions;


const Path = ({ match, curriculum, user }) => {
  const pathId = match.params.id;
  const path = curriculum.paths[match.params.id];
  const milestones = path.courseIds.map((courseId, index) => {
    const course = curriculum.courses[courseId];
    const lessons = course.lessonIds.map((lessonId) => {
      const lesson = curriculum.lessons[lessonId];
      return <LinkCard item={lesson} linkTo={lesson.url} bgColorClass="relative dot dot--empty dot--displace bg-primary" iconClass="fa-flag-checkered" key={lessonId} connectionClass="connected--secondary" />;
    });

    return <MilestoneCard index={index} course={course} lessons={lessons} />;
  });

  return (
    <div>
      <Helmet
        title={`Path: ${path.name}`}
        meta={[
          { name: 'description', content: path.description },
        ]}
      />
      <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__path" bgUrl={`/paths/${pathId}.jpg`} title={path.name}>
        {pathId === user.curPathId ?
          <BreadCrumbs rootNode={{ name: 'Current Path', url: '/dashboard' }} nodes={[path]} /> :
          <BreadCrumbs rootNode={{ name: 'Paths', url: '/library' }} nodes={[path]} />}
        <i className="fa fa-road c-white h0 abs-top-right" />
        {path.completed ? <i className="fa fa-check-circle-o c-white h0 abs-bottom-right" /> : null}
      </PageHero>
      <div className="bg-white">
        <div className="container flex">
          <div className="padding-vertical-big flex-1">
            <h2>About This Path</h2>
            <p className="h5">{path.description}</p>
            <h3 className="margin-top-big">GOAL</h3>
            <p className="h5">Becoming a confident web developer ready to apply for junior positions.</p>
          </div>
          <div className="padding-vertical-big margin-left-huge">
            <div className="right margin-bottom-small">
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
              <h5 className="normal">Estimated Length</h5>
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
            <div className="flex justify-space-between margin-top-big">
              <h5 className="normal">Estimated Entry Salary</h5>
              <div className="right">
                <h2 className="c-secondary right no-margin margin-left-big">~ $35,000 / year</h2>
                <a href="/">(Source: Monster.com)</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* user.authenticated ?
        <PageDivider>
          <button className="button--secondary" onClick={() => setCurrentPath(pathId, path.version)}>Start Path</button>
          <span className="normal h3">
            <i className="fa fa-tasks h3 c-secondary margin-right-tiny" />{path.nCompleted}/{path.nTotal}
          </span>
          {!path.bookmarked ?
            <button className="button--primary" onClick={() => addBookmark(pathId, 'paths', path.version)}>Bookmark Path</button> :
            <button className="button--secondary" onClick={() => removeBookmark(pathId, 'paths', path.version)}>Remove Bookmark</button>}
        </PageDivider> :
        <PageDivider />*/}
      <div className="container flex margin-bottom-big">
        {/* <div className="path-node flex-column flex-1">
          <div className="path-node__connection flex-1">
            <p className="hidden">content</p>
          </div>
        </div>*/}
        <div className="path-node flex-column align-items-center">
          <div className="path-node__connection flex-1">
            <p className="hidden">content</p>
          </div>
        </div>
        <div className="container flex-column">
          {milestones}
          {/* <div className="row">
            <div className="grid-half">
              <InfoCard item={path} bgColorClass="bg-primary" />
            </div>
            <div className="grid-half">
              {courses}
            </div>
          </div>*/}
        </div>
      </div>
      <div className="container">
        {user.authenticated ? <hr /> : null}
        {user.authenticated ?
          <DisqusThread
            id={`/path-${pathId}`}
            title={path.name}
            path={path.url}
          /> : null}
      </div>
    </div>
  );
};

Path.propTypes = {
  match: PropTypes.objectOf(PropTypes.shape).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default Path;
