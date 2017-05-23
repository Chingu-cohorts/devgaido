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
