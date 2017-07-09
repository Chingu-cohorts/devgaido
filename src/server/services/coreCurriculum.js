import { getAllPaths } from './corePaths';
import { getAllCourses } from './coreCourses';
import { getAllLessons } from './coreLessons';
import { getAllSubjects } from './coreSubjects';

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
      path.completedLinkTo = `/paths/${pathId}`;
      path.courseIds.forEach((courseId) => {
        const course = curriculum.courses[courseId];
        course.completedLinkTo = `/paths/${pathId}/${courseId}`;
      });
    } else {
      path.completed = false;
      path.completedLinkTo = '';
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

const initialize = (curriculum) => {
  updateCourses(curriculum);
  updatePaths(curriculum);

  return curriculum;
};

const getCurriculum = () => {
  const curriculum = {
    subjects: getAllSubjects(),
    paths: getAllPaths(),
    courses: getAllCourses(),
    lessons: getAllLessons(),
  };
  return initialize(curriculum);
};

export default getCurriculum;
