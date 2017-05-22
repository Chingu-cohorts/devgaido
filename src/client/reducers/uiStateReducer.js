import Paths from '../pages/Paths/PathsReducer';

const uiState = (state = {
  global: {
    navMenuOpen: false,
  },
  Pages: {
    Paths: {
      pathStates: [],
    },
  },
}, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV_MENU': {
      return {
        ...state,
        global: {
          ...state.global,
          navMenuOpen: !state.global.navMenuOpen,
        },
      };
    }
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
