export function setCurrentDashboardTab(currentTabIndex) {
  return {
    type: 'SET_CURRENT_DASHBOARD_TAB',
    currentTabIndex,
  };
}

export default { setCurrentDashboardTab };
