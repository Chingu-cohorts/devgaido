export function setCurrentDashboardTab(currentTabIndex) {
  return {
    type: 'SET_CURRENT_DASHBOARD_TAB',
    currentTabIndex,
  };
}
export function setCurrentDashboardPath(currentPathId) {
  return {
    type: 'SET_CURRENT_DASHBOARD_PATH',
    currentPathId,
  };
}
