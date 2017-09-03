const uiState = (state = {
  navMenuOpen: false,
  libSearchTerm: '',
  libTopic: 'All Tags',
  libShowCompleted: true,
  libShowIncomplete: true,
  showPopup: false,
  curDashboardTab: 0,
  curLibraryTab: 0,
  openedMilestones: [],
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
      const openedMilestones = state.openedMilestones.slice(0);
      const index = openedMilestones.indexOf(action.milestoneId);

      if (index !== -1) {
        openedMilestones.splice(index, 1);
      } else {
        openedMilestones.push(action.milestoneId);
      }
      return {
        ...state,
        openedMilestones,
      };
    }
    default:
      return state;
  }
};

export default uiState;
