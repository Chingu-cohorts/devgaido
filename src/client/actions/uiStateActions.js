/* eslint-disable import/prefer-default-export */

/**
 * Actions that are global across all pages in the UI
 *
 * @returns {object} type - Action type identifier
 */
import makeActionCreator from './makeActionCreator';

export const toggleNavMenu = makeActionCreator('TOGGLE_NAV_MENU');
export const toggleMilestoneCard = makeActionCreator('TOGGLE_MILESTONE_CARD', 'milestoneId');
export const setCurrentDashboardTab = makeActionCreator('SET_CURRENT_DASHBOARD_TAB', 'tabIndex');
export const setCurrentLibraryTab = makeActionCreator('SET_CURRENT_LIBRARY_TAB', 'tabIndex');
export const setLibraryTopic = makeActionCreator('SET_LIBRARY_TOPIC', 'topic');
export const setLibrarySearchTerm = makeActionCreator('SET_LIBRARY_SEARCH_TERM', 'searchTerm');
export const toggleLibraryShowCompleted = makeActionCreator('TOGGLE_LIBRARY_SHOW_COMPLETED');
export const toggleLibraryShowIncomplete = makeActionCreator('TOGGLE_LIBRARY_SHOW_INCOMPLETE');
export const toggleModal = makeActionCreator('TOGGLE_MODAL');
