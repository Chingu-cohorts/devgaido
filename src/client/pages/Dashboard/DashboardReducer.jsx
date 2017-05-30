const Dashboard = (state = {
  currentTab: 0,
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_DASHBOARD_TAB': {
      return {
        ...state,
        currentTab: action.currentTabIndex,
      };
    }
    default:
      return state;
  }
};

export default Dashboard;
