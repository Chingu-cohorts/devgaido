/* eslint-disable import/prefer-default-export */

export function initCompletionStatus(user, curriculum) {
  return {
    type: 'INIT_COMPLETION_STATUS',
    user,
    curriculum,
  };
}
