import Dashboard from '../pages/Dashboard/DashboardReducer';
import PathCatalog from '../pages/PathCatalog/PathCatalogReducer';
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
    PathCatalog: {
      topic: 'All Topics',
      searchTerm: '',
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
    case 'SET_CATALOG_TOPIC':
    case 'SET_CATALOG_SEARCH_TERM': {
      return {
        ...state,
        Pages: {
          ...state.Pages,
          PathCatalog: PathCatalog(state.Pages.PathCatalog, action),
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
    default:
      return state;
  }
};

export default uiState;
