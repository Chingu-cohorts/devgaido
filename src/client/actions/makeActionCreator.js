
/**
 * @description Given an action and a list of associated argument names return
 * a function that when invoked will return an action object. containing the
 * the values associated with these argument names. The generated function
 * will be invoked when an associated user event or action occurs, like the
 * press of a button.
 * @param {String} type Redux action name
 * @param {String[]} argNames Parameters whose values are to be returned
 * @returns {String[]} action An array where the first entry is the
 * Redux action name and the following entries consist of the values
 * cooresponding to the supplied argument names (see second parameter above)
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
