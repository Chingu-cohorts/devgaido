
/**
 * @description Given an action and a list of associated argument name return
 * a function that when invoked will return an action object. The generated
 * function will be invoked when an associated user event or action, like the
 * press of a button, occurs.
 * @param {String} type Redux action name
 * @param {String[]} argNames Parameters whose values are to be returned
 * @returns {Object} action An object of {id: '', data: []} where 'id' is the
 * Redux action name and 'data' is an array of values cooresponding to the
 * supplied argument names (see second parameter above)
 */
export default (type, ...argNames) => {
  // eslint-disable-next-line func-names
  return function (...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};
