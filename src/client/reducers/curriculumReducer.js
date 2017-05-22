/**
 * Curriculum data consisting of Core Paths, Core Courses, and Core Lessons.
 * In addition this includes subjects which categorize all three fo the above.
 *
 * @param {*} state -
 * @param {*} action - 
 * @returns {state} state - The curriculum data maintained in state
 */
const curriculum = (state = {
  lessons: [],
  subjects: [],
  courses: [],
  paths: [],
}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default curriculum;
