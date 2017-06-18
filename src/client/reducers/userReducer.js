const getCompletionStatus = (user, curriculum) => {
  const completionStatus = {
    paths: [],
    completedPaths: [],
    courses: [],
    completedCourses: [],
    lessons: [],
    completedLessons: [],
  };

  Object.keys(curriculum.paths).forEach((pathId) => {
    const path = curriculum.paths[pathId];
    let totalCourses = 0;
    let completedCourses = 0;

    completionStatus.paths.push(path);
    path.courseIds.forEach((courseId) => {
      if (curriculum.courses[courseId]) {
        totalCourses += 1;
        completionStatus.courses.push(courseId);
        const totalLessons = curriculum.courses[courseId].lessonIds.length;
        let completedLessons = 0;
        curriculum.courses[courseId].lessonIds.forEach((lessonId) => {
          if (completionStatus.lessons.indexOf(lessonId) === -1) {
            completionStatus.lessons.push(lessonId);
            if (user.lessonsCompleted.indexOf(lessonId) !== -1) {
              completedLessons += 1;
              completionStatus.completedLessons.push(lessonId);
            }
          }
        });
        if (completedLessons === totalLessons) {
          completedCourses += 1;
          completionStatus.completedCourses.push(courseId);
        }
      }
    });
    if (totalCourses !== 0 && completedCourses === totalCourses) {
      completionStatus.completedPaths.push(pathId);
    }
  });
  return completionStatus;
};

/**
 * User state consisting of attributes for the user if logged in.
 *
 * @param {*} state -
 * @param {*} action -
 * @returns {state} state - User data maintained in state
 */
const user = (state = {
  name: '',
  authenticated: false,
  email: '',
  dayLastVisited: Date.now(),
  streak: 0,
  bookmarkedPaths: ['webpagedc', 'javascript'],
  lessonsCompleted: ['learnhtmlcss', 'onlineresume', 'advancedhtml', 'intermediatecss', 'advancedcss'],
  completionStatus: {
    paths: [],
    completedPaths: [],
    courses: [],
    completedCourses: [],
    lessons: [],
    completedLessons: [],
  },
  curPathId: 'srcctrl',
}, action) => {
  switch (action.type) {
    case 'INIT_COMPLETION_STATUS':
      return { ...state, completionStatus: getCompletionStatus(action.user, action.curriculum) };
    default:
      return state;
  }
};

export default user;
