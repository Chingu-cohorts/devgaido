import { getAllPaths } from './corePaths';
import { getAllCourses } from './coreCourses';
import { getAllLessons } from './coreLessons';
import { getAllSubjects } from './coreSubjects';

const initPaths = (curriculum) => {
  Object.keys(curriculum.paths).forEach((pathId) => {
    const path = curriculum.paths[pathId];
    const completed = 0;
    const total = path.courseIds.length;

    path.nCompleted = completed;
    path.nTotal = total;
    path.completed = false;
    path.subjects = [];

    path.courseIds.forEach((courseId) => {
      const course = curriculum.courses[courseId];

      course.subjects.forEach((subject) => {
        if (path.subjects.indexOf(subject) === -1) {
          path.subjects.push(subject);
        }
      });
    });
  });
};

const initCourses = (curriculum) => {
  Object.keys(curriculum.courses).forEach((courseId) => {
    const course = curriculum.courses[courseId];
    const completed = 0;
    const total = course.lessonIds.length;

    course.nCompleted = completed;
    course.nTotal = total;
    course.completed = false;
    course.subjects = [];

    course.lessonIds.forEach((lessonId) => {
      const lesson = curriculum.lessons[lessonId];

      lesson.subjects.forEach((subject) => {
        if (course.subjects.indexOf(subject) === -1) {
          course.subjects.push(subject);
        }
      });
    });
  });
};

const init = (curriculum) => {
  initCourses(curriculum);
  initPaths(curriculum);

  return curriculum;
};

const getCurriculum = () => {
  const curriculum = {
    subjects: getAllSubjects(),
    paths: getAllPaths(),
    courses: getAllCourses(),
    lessons: getAllLessons(),
  };
  return init(curriculum);
};

export default getCurriculum;
