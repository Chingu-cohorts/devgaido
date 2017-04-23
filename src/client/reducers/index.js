import { combineReducers } from 'redux';

const selection = (state = 0, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default combineReducers({ selection });
