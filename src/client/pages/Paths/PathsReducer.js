const pathState = (state = {}, action) => {
  switch (action.type) {
    case 'TOGGLE_PATH': {
      const newState = { ...state, opened: !state.opened };
      return newState;
    }
    default:
      return state;
  }
};

const Paths = (state = {
  pathStates: [],
}, action) => {
  switch (action.type) {
    case 'INIT_PATHS': {
      const newPathStates = [];
      for (let i = 0; i < action.n; i += 1) {
        newPathStates.push({
          id: i,
          opened: false,
        });
      }
      return { ...state, pathStates: newPathStates };
    }
    case 'TOGGLE_PATH': {
      const pathStatesCopy = state.pathStates.slice(0);
      const newPathStates = pathStatesCopy.map(
        el => ((el.id !== action.id) ? el : pathState(el, action)));
      return {
        ...state,
        pathStates: newPathStates,
      };
    }
    default:
      return state;
  }
};

export default Paths;
