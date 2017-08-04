/* eslint-disable import/prefer-default-export */

/**
 * Actions that are global across all pages in the UI
 *
 * @returns {object} type - Action type identifier
 */
export function toggleNavMenu() {
  return {
    type: 'TOGGLE_NAV_MENU',
  };
}

export function toggleMilestoneCard(milestoneId) {
  return {
    type: 'TOGGLE_MILESTONE_CARD',
    milestoneId,
  };
}

export function setCurrentDashboardTab(tabIndex) {
  return {
    type: 'SET_CURRENT_DASHBOARD_TAB',
    tabIndex,
  };
}

export function setCurrentLibraryTab(tabIndex) {
  return {
    type: 'SET_CURRENT_LIBRARY_TAB',
    tabIndex,
  };
}

export function setLibraryTopic(topic) {
  return {
    type: 'SET_LIBRARY_TOPIC',
    topic,
  };
}

export function setLibrarySearchTerm(searchTerm) {
  return {
    type: 'SET_LIBRARY_SEARCH_TERM',
    searchTerm,
  };
}

export function toggleLibraryShowCompleted() {
  return {
    type: 'TOGGLE_LIBRARY_SHOW_COMPLETED',
  };
}

export function toggleLibraryShowIncomplete() {
  return {
    type: 'TOGGLE_LIBRARY_SHOW_INCOMPLETE',
  };
}
