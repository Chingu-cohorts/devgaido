/* eslint-disable import/prefer-default-export */

// TODO: Get rid of this and put something useful here
/**
 * User login action
 *
 * @export
 * @param {any} user -
 * @returns {object} - User action type identifier
 */
export function loginTestUser(user) {
  return {
    type: 'TEST_LOGIN',
    user,
  };
}
