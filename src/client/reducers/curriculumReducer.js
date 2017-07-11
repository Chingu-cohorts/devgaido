const updatePaths = (curriculum) => {
  Object.keys(curriculum.paths).forEach((pathId) => {
    let completed = 0;
    let total = 0;
    const path = curriculum.paths[pathId];
    path.courseIds.forEach((courseId) => {
      total += 1;
      if (curriculum.courses[courseId] && curriculum.courses[courseId].completed) {
        completed += 1;
      }
    });
    path.nCompleted = completed;
    path.nTotal = total;

    if (total !== 0 && total === completed) {
      path.completed = true;
    } else {
      path.completed = false;
    }
  });
};

const updateCourses = (curriculum) => {
  Object.keys(curriculum.courses).forEach((courseId) => {
    let completed = 0;
    let total = 0;
    const course = curriculum.courses[courseId];
    course.lessonIds.forEach((lessonId) => {
      total += 1;
      if (curriculum.lessons[lessonId] && curriculum.lessons[lessonId].completed) {
        completed += 1;
      }
    });
    course.nCompleted = completed;
    course.nTotal = total;

    if (total !== 0 && total === completed) {
      course.completed = true;
    } else {
      course.completed = false;
    }
  });
};
/**
 * Curriculum data consisting of Core Paths, Core Courses, and Core Lessons.
 * In addition this includes subjects which categorize all three fo the above.
 *
 * @param {*} state -
 * @param {*} action -
 * @returns {state} state - The curriculum data maintained in state
 */
const curriculum = (state = {
  lessons: {},
  subjects: {},
  courses: {},
  paths: {},
}, action) => {
  switch (action.type) {
    case 'COMPLETE_LESSON': {
      const newLessons = { ...(state.lessons) };
      newLessons[action.lessonId].completed = true;
      const newState = {
        ...state,
        lessons: { ...newLessons },
      };
      updateCourses(newState);
      updatePaths(newState);
      return newState;
    }
    case 'UNCOMPLETE_LESSON': {
      const newLessons = { ...(state.lessons) };
      newLessons[action.lessonId].completed = false;
      const newState = {
        ...state,
        lessons: { ...newLessons },
      };
      updateCourses(newState);
      updatePaths(newState);
      return newState;
    }
    case 'ADD_BOOKMARK': {
      const newState = { ...state };
      const item = newState[action.itemCategory][action.itemId];
      item.bookmarked = true;

      return newState;
    }
    case 'REMOVE_BOOKMARK': {
      const newState = { ...state };
      const item = newState[action.itemCategory][action.itemId];

      item.bookmarked = false;

      return newState;
    }
    default:
      return state;
  }
};

export default curriculum;
