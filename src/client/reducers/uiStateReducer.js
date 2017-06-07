import Paths from '../pages/Paths/PathsReducer';
import Dashboard from '../pages/Dashboard/DashboardReducer';
/**
 * UI State. 'global' defines state items that are available across all pages
 * in the client, while 'Pages' contains state that is specific to a given
 * page.
 *
 * To add a new page simply add the page name within 'Pages' followed by its
 * state definition:
 *
 *  Pages: {
 *    NewPageName: {
 *      stateItem: ...
 *    }
 *  }
 *
 * @param {*} state -
 * @param {*} action -
 * @returns {state} state - UI data maintained in state
 */
const uiState = (state = {
  global: {
    navMenuOpen: false,
  },
  Pages: {
    Paths: {
      pathStates: [],
    },
    Dashboard: {
      currentTab: 0,
      currentPath: '',
    },
  },
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_DASHBOARD_PATH':
    case 'SET_CURRENT_DASHBOARD_TAB': {
      return {
        ...state,
        Pages: {
          ...state.Pages,
          Dashboard: Dashboard(state.Pages.Dashboard, action),
        },
      };
    }
    case 'TOGGLE_NAV_MENU': {
      return {
        ...state,
        global: {
          ...state.global,
          navMenuOpen: !state.global.navMenuOpen,
        },
      };
    }
    case 'INIT_PATHS' :
    case 'TOGGLE_PATH': {
      return {
        ...state,
        Pages: {
          ...state.Pages,
          Paths: Paths(state.Pages.Paths, action),
        },
      };
    }
    default:
      return state;
  }
};

export default uiState;
