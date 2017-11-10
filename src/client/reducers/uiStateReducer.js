/**
 * @description Update the UI state based on the current action
 * @param {Object} [state={
 *   navMenuOpen: false,
 *   libSearchTerm: '',
 *   libTopic: 'All Tags',
 *   libShowCompleted: true,
 *   libShowIncomplete: true,
 *   showPopup: false,
 *   curDashboardTab: 0,
 *   curLibraryTab: 0,
 *   openMilestone: '',
 *   showModal: false,
 * }] 
 * @param {Object} action UI state action name
 * @returns {Object} Updated UI state
 */
const uiState = (state = {
  navMenuOpen: false,
  libSearchTerm: '',
  libTopic: 'All Tags',
  libShowCompleted: true,
  libShowIncomplete: true,
  showPopup: false,
  curDashboardTab: 0,
  curLibraryTab: 0,
  openMilestone: '',
  showModal: false,
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_DASHBOARD_TAB': {
      return {
        ...state,
        curDashboardTab: action.tabIndex,
      };
    }
    case 'SET_CURRENT_LIBRARY_TAB': {
      return {
        ...state,
        curLibraryTab: action.tabIndex,
      };
    }
    case 'SET_LIBRARY_SEARCH_TERM': {
      return {
        ...state,
        libSearchTerm: action.searchTerm,
      };
    }
    case 'SET_LIBRARY_TOPIC': {
      return {
        ...state,
        libTopic: action.topic,
      };
    }
    case 'TOGGLE_LIBRARY_SHOW_COMPLETED': {
      return {
        ...state,
        libShowCompleted: !state.libShowCompleted,
      };
    }
    case 'TOGGLE_LIBRARY_SHOW_INCOMPLETE': {
      return {
        ...state,
        libShowIncomplete: !state.libShowIncomplete,
      };
    }
    case 'TOGGLE_MODAL': {
      return {
        ...state,
        showModal: !state.showModal,
      };
    }
    case 'TOGGLE_NAV_MENU': {
      return {
        ...state,
        navMenuOpen: !state.navMenuOpen,
      };
    }
    case 'TOGGLE_MILESTONE_CARD': {
      return {
        ...state,
        openMilestone: state.openMilestone === action.milestoneId ? '' : action.milestoneId,
      };
    }
    default:
      return state;
  }
};

export default uiState;
