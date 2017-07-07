import React from 'react';
import PropTypes from 'prop-types';
import { setCurrentDashboardTab } from './DashboardActions';

import PageDivider from '../shared/PageDivider';

const setCurrentTab = (tabIndex, dispatch) => {
  dispatch(setCurrentDashboardTab(tabIndex));
};

const TabbedContent = ({ content, dispatch, uiState }) => (
  <div>
    <PageDivider>
      <div className="flex-1 center">
        {content.map((c, index) => (
          <button
            className={index === uiState.Pages.Dashboard.currentTab ? 'button--secondary uppercase margin-horizontal-tiny' : 'button--default uppercase margin-horizontal-tiny'}
            onClick={() => setCurrentTab(index, dispatch)}
            key={index}
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
  dispatch: PropTypes.func.isRequired,
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default TabbedContent;
