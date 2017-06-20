import React from 'react';
import PropTypes from 'prop-types';
import { setCurrentDashboardTab } from './DashboardActions';

const setCurrentTab = (tabIndex, dispatch) => {
  dispatch(setCurrentDashboardTab(tabIndex));
};

const TabbedContent = ({ content, dispatch, uiState }) => (
  <div className="tabbed-content">
    <div className="tabs">
      {content.map((c, index) => (
        <button
          className={index === uiState.Pages.Dashboard.currentTab ? 'tabButton activeTabCaption' : 'tabButton inactiveTabCaption'}
          onClick={() => setCurrentTab(index, dispatch)}
          key={index}
        >
          {c.caption}
        </button>
      ))}
    </div>
    <div>
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
