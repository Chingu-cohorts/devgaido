import axios from 'axios';
/**
 * @description Save the users state to the database so it persists
 * across sessions.
 * @param {any} state The user's current state
 */
const saveToServer = (state) => {
  axios.post('/users', state)
    .then((res) => {
      if (process.env.NODE_ENV !== 'production') {
        console.log('Saved:', res);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * @description Locate the index number of the Redux action within the array of
 * state values.
 * @param {any} action Redux action to be located.
 * @param {any} data Array of state values.
 * @returns {Number} index Cell number of the action string
 */
const getIndex = (action, data) => {
  let index = -1;

  for (let i = 0; i < data.length; i += 1) {
    let equal = true;

    Object.keys(action).forEach((attribute) => {
      equal = equal && (action[attribute] === data[i][attribute]);
    });

    if (equal) {
      index = i;
      break;
    }
  }
  return index;
};

/**
 * @description Save a curriculum state for the current user to the database.
 * @param {Object} state={
 *   id: '',
 *   data: [],
 * } The state to be saved
 * @param {String} action
 * @returns {Object} The new state
 */
const persistantData = (state = {
  id: '',
  data: [],
}, action) => {
  switch (action.type) {
    case 'COMPLETE_LESSON':
    case 'ADD_BOOKMARK': {
      const newData = state.data.slice(0);
      const index = getIndex(action, newData);

      if (index !== -1) {
        // Same action as before, so return
        return state;
      }

      newData.push(action);

      saveToServer({
        ...state,
        data: newData,
      });
      return {
        ...state,
        data: newData,
      };
    }
    case 'SET_CURRENT_PATH': {
      const newData = state.data.slice(0);
      let index = getIndex(action, newData);

      if (index !== -1) {
        // Same action as before, so return
        return state;
      }

      index = getIndex({ type: 'SET_CURRENT_PATH' }, newData);

      if (index !== -1) {
        // Some other path, so remove old one first
        newData.splice(index, 1);
      }
      newData.push(action);

      saveToServer({
        ...state,
        data: newData,
      });

      return {
        ...state,
        data: newData,
      };
    }
    case 'SET_LAST_TOUCHED_LESSON': {
      const newData = state.data.slice(0);
      let index = getIndex(action, newData);

      if (index !== -1) {
        // Same action as before, so return
        return state;
      }

      index = getIndex({ type: 'SET_LAST_TOUCHED_LESSON' }, newData);

      if (index !== -1) {
        // Some other path, so remove old one first
        newData.splice(index, 1);
      }
      newData.push(action);

      saveToServer({
        ...state,
        data: newData,
      });

      return {
        ...state,
        data: newData,
      };
    }

    case 'UNCOMPLETE_LESSON':
    case 'REMOVE_BOOKMARK': {
      const newData = state.data.slice(0);
      let type = '';

      switch (action.type) {
        case 'UNCOMPLETE_LESSON':
          type = 'COMPLETE_LESSON';
          break;
        case 'REMOVE_BOOKMARK':
          type = 'ADD_BOOKMARK';
          break;
        default:
          type = '';
          break;
      }

      const index = getIndex({ ...action, type }, newData);

      if (index !== -1) {
        newData.splice(index, 1);
      }

      saveToServer({
        ...state,
        data: newData,
      });

      return {
        ...state,
        data: newData,
      };
    }
    default:
      return state;
  }
};

export default persistantData;
