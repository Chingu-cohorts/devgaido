import React from 'react';
import PropTypes from 'prop-types';

import Legend from './Legend';
import Results from './Results';
import PageHero from '../shared/PageHero';
import PageDivider from '../shared/PageDivider';

import { setCatalogTopic, setCatalogSearchTerm } from './PathCatalogActions';

const onSearchChange = (e, dispatch) => {
  dispatch(setCatalogSearchTerm(e.target.value));
};

const onTopicChange = (e, dispatch) => {
  dispatch(setCatalogTopic(e.target.value));
};

const PathCatalog = ({ curriculum, uiState, dispatch }) => (
  <div>
    <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__library" title="Browse Paths">
      <Legend curriculum={curriculum} />
    </PageHero>
    <PageDivider>
      <div className="search-bar flex flex-1">
        <i className="fa fa-search c-primary h3 margin-right-small" />
        <input className="margin-right-small h5 thin" type="text" name="pathSearch" defaultValue={uiState.Pages.PathCatalog.searchTerm} placeholder="Search" onChange={e => onSearchChange(e, dispatch)} />

      </div>
      <div className="topics-dropdown relative">
        <select className="h5 thin" defaultValue={uiState.Pages.PathCatalog.topic} onChange={e => onTopicChange(e, dispatch)} >
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

PathCatalog.propTypes = {
  curriculum: PropTypes.objectOf(PropTypes.shape),
  dispatch: PropTypes.func,
  uiState: PropTypes.objectOf(PropTypes.shape),
};

PathCatalog.defaultProps = {
  curriculum: null,
  dispatch: null,
  uiState: null,
};

export default PathCatalog;
