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
      course.parentPathIds.push(pathId);
      course.subjects.forEach((subject) => {
        if (path.subjects.indexOf(subject) === -1) {
          path.subjects.push(subject);
        }
      });
      course.lessonIds.forEach((lessonId) => {
        const lesson = curriculum.lessons[lessonId];

        if (lesson.parentPathIds.indexOf(pathId) === -1) {
          lesson.parentPathIds.push(pathId);
        }
      });
    });
    path.url = `/paths/${pathId}`;
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
    course.parentPathIds = [];
    course.lessonIds.forEach((lessonId) => {
      const lesson = curriculum.lessons[lessonId];
      lesson.parentCourseIds.push(courseId);
      lesson.subjects.forEach((subject) => {
        if (course.subjects.indexOf(subject) === -1) {
          course.subjects.push(subject);
        }
      });
    });
    course.url = `/courses/${courseId}`;
  });
};

const initLessons = (curriculum) => {
  Object.keys(curriculum.lessons).forEach((lessonId) => {
    const lesson = curriculum.lessons[lessonId];
    lesson.parentCourseIds = [];
    lesson.parentPathIds = [];
    lesson.completed = false;
    lesson.url = `/lessons/${lessonId}`;
  });
};

const init = (curriculum) => {
  initLessons(curriculum);
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
