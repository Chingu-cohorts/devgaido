/**
 * Toggle the display of the detail elements in a core path.
 *
 * @param {any} id - Path identifier
 * @returns {Object} - Action type and path identifier
 */
export function togglePath(id) {
  return {
    type: 'TOGGLE_PATH',
    id,
  };
}

export default { togglePath };
