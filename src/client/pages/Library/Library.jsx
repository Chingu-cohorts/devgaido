import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import Legend from './Legend';
import Results from './Results';
import PageHero from '../shared/PageHero';
import PageDivider from '../shared/PageDivider';
import TabbedContent from '../shared/TabbedContent';
import Checkbox from '../shared/Checkbox';

import actions from '../../actions';

const {
  setLibraryTopic,
  setLibrarySearchTerm,
  setCurrentLibraryTab,
  toggleLibraryShowCompleted,
  toggleLibraryShowIncomplete,
} = actions;

const Library = ({ curriculum, uiState, user }) => (
  <div>
    <Helmet title="Library" />
    <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__library" title="Library">
      <Legend />
    </PageHero>
    <PageDivider>
      <div className="search-bar flex flex-1">
        <i className="fa icon-search c-secondary h3 margin-right-small" />
        <input className="margin-right-small h5 thin" type="text" name="pathSearch" defaultValue={uiState.libSearchTerm} placeholder="Search" onChange={e => setLibrarySearchTerm(e.target.value)} />
      </div>
      <div className="topics-dropdown relative">
        <select className="h5 thin" defaultValue={uiState.libTopic} onChange={e => setLibraryTopic(e.target.value)} >
          <option value="All Topics" key="AllTopics">All Topics</option>
          {Object.keys(curriculum.subjects).map(
            subjectId => <option value={subjectId} key={subjectId}>{subjectId}</option>,
          )}
        </select>
      </div>
      { user.authenticated ? <Checkbox checked={uiState.libShowCompleted} onChange={toggleLibraryShowCompleted}>Completed</Checkbox> : null }
      { user.authenticated ? <Checkbox checked={uiState.libShowIncomplete} onChange={toggleLibraryShowIncomplete}>Incomplete</Checkbox> : null }
    </PageDivider>
    <TabbedContent
      content={[{
        caption: 'Paths',
        content: <Results category="paths" />,
      }, {
        caption: 'Lessons',
        content: <Results category="lessons" />,
      }]}
      tabIndex={uiState.curLibraryTab}
      onClick={index => setCurrentLibraryTab(index)}
    />
  </div>
);

Library.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
  uiState: store.uiState,
  curriculum: store.curriculum,
}))(Library);

