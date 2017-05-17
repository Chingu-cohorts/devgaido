const path = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_PATH': {
      const newState = { ...state, opened: !state.opened };
      return newState;
    }
    default:
      return state;
  }
};

const pathPage = (state = {
  paths: [],
}, action) => {
  switch (action.type) {
    case 'TOGGLE_PATH': {
      const paths = state.paths.slice(0);
      const newPaths = paths.map(el => ((el.id !== action.id) ? el : path(el, action)));
      return {
        ...state,
        paths: newPaths,
      };
    }
    default:
      return state;
  }
};

export default pathPage;
