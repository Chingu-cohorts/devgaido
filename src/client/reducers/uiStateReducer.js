import Paths from '../pages/Paths/PathsReducer';

const uiState = (state = {
  Pages: {
    Paths: {
      pathStates: [],
    },
  },
}, action) => {
  switch (action.type) {
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
