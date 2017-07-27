import React from 'react';
import PropTypes from 'prop-types';

import PageDivider from '../shared/PageDivider';
import actions from '../../actions';

const { setCurrentDashboardTab } = actions;

const TabbedContent = ({ content, uiState }) => (
  <div>
    <PageDivider>
      <div className="flex-1 center">
        {content.map((c, index) => (
          <button
            className={index === uiState.Pages.Dashboard.currentTab ? 'button--secondary uppercase margin-horizontal-tiny' : 'button--default uppercase margin-horizontal-tiny'}
            onClick={() => setCurrentDashboardTab(index)}
            key={c.caption}
          >
            {c.caption}
          </button>
        ))}
      </div>
    </PageDivider>
    <div className="container margin-top-small">
      {content[uiState.Pages.Dashboard.currentTab].content}
    </div>
  </div>
);


TabbedContent.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape).isRequired,
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default TabbedContent;
