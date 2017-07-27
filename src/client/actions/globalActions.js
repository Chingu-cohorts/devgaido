/* eslint-disable import/prefer-default-export */

/**
 * Actions that are global across all pages in the UI
 *
 * @returns {object} type - Action type identifier
 */
export function toggleNavMenu() {
  return {
    type: 'TOGGLE_NAV_MENU',
  };
}
