const Dashboard = (state = {
  currentTab: 0,
  currentPath: '10010',
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_DASHBOARD_TAB': {
      return {
        ...state,
        currentTab: action.currentTabIndex,
      };
    }
    case 'SET_CURRENT_DASHBOARD_PATH': {
      return {
        ...state,
        currentPath: action.currentPathId,
      };
    }
    default:
      return state;
  }
};

export default Dashboard;
