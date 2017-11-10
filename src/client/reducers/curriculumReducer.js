
/**
 * @description Examine all paths to calculate user-specific path completion metrics.
 * @param {any} curriculum 
 */
const updatePaths = (curriculum) => {
  Object.keys(curriculum.paths).forEach((pathId) => {
    let completed = 0;
    let total = 0;
    let nLessonsTotal = 0;
    let nLessonsCompleted = 0;

    const path = curriculum.paths[pathId];
    path.courseIds.forEach((courseId) => {
      total += 1;
      if (curriculum.courses[courseId] && curriculum.courses[courseId].completed) {
        completed += 1;
      }
      const course = curriculum.courses[courseId];

      nLessonsTotal += course.completeX ? course.completeX : course.lessonIds.length;

      course.lessonIds.forEach((lessonId) => {
        const lesson = curriculum.lessons[lessonId];

        if (lesson.completed) {
          nLessonsCompleted += 1;
        }
      });
    });

    path.nCompleted = completed;
    path.nTotal = total;
    path.nLessonsTotal = nLessonsTotal;
    path.nLessonsCompleted = nLessonsCompleted;

    if (total !== 0 && total === completed) {
      path.completed = true;
    } else {
      path.completed = false;
    }
  });
};

/**
 * @description Examine all courses to calculate user-specific course completion metrics.
 * @param {Object} curriculum An object that contains one object for the paths, courses,
 * lessons, and subjects that make up the curriculum.
 */
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
    course.nTotal = course.completeX ? course.completeX : total;

    if (course.nTotal !== 0 && course.nTotal <= completed) {
      course.completed = true;
    } else {
      course.completed = false;
    }
  });
};

/**
 * @description Apply the Redux action against the curriculum for the current user.
 * @param {Object} [state={
 *   lessons: {},
 *   subjects: {},
 *   courses: {},
 *   paths: {},
 * }] Contains one object each for lessons, subjects, courses, and
 * paths.
 * @param {Object} action The Redux action
 * @returns {Object} state Updated curriculum state
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

      const itemCategory = action.itemType === 'path' ? 'paths' : 'lessons';
      const item = newState[itemCategory][action.itemId];

      item.bookmarked = true;

      return newState;
    }
    case 'REMOVE_BOOKMARK': {
      const newState = { ...state };

      const itemCategory = action.itemType === 'path' ? 'paths' : 'lessons';
      const item = newState[itemCategory][action.itemId];

      item.bookmarked = false;

      return newState;
    }
    default:
      return state;
  }
};

export default curriculum;
