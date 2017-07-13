import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Legend from './Legend';
import Results from './Results';
import PageHero from '../shared/PageHero';
import PageDivider from '../shared/PageDivider';

import { setLibraryTopic, setLibrarySearchTerm } from './LibraryActions';

const onSearchChange = (e, dispatch) => {
  dispatch(setLibrarySearchTerm(e.target.value));
};

const onTopicChange = (e, dispatch) => {
  dispatch(setLibraryTopic(e.target.value));
};

const Library = ({ curriculum, uiState, dispatch }) => (
  <div>
    <Helmet title="Library" />
    <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__library" title="Library">
      <Legend curriculum={curriculum} />
    </PageHero>
    <PageDivider>
      <div className="search-bar flex flex-1">
        <i className="fa fa-search c-secondary h3 margin-right-small" />
        <input className="margin-right-small h5 thin" type="text" name="pathSearch" defaultValue={uiState.Pages.Library.searchTerm} placeholder="Search" onChange={e => onSearchChange(e, dispatch)} />

      </div>
      <div className="topics-dropdown relative">
        <select className="h5 thin" defaultValue={uiState.Pages.Library.topic} onChange={e => onTopicChange(e, dispatch)} >
          <option value="All Topics" key="AllTopics">All Topics</option>
          {Object.keys(curriculum.subjects).map(
            subjectId => <option value={subjectId} key={subjectId}>{subjectId}</option>,
          )}
        </select>
      </div>
    </PageDivider>
    <div className="container">
      <Results curriculum={curriculum} uiState={uiState} />
    </div>
  </div>
);

Library.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
  uiState: PropTypes.objectOf(PropTypes.shape),
};

Library.defaultProps = {
  curriculum: null,
  dispatch: null,
  uiState: null,
};

export default Library;
