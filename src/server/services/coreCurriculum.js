import deepcopy from 'deepcopy';

import { getAllPaths } from './corePaths';
import { getAllCourses } from './coreCourses';
import { getAllLessons } from './coreLessons';
import { getAllSubjects } from './coreSubjects';

const strToTime = {
  short: 4,
  medium: 8,
  long: 16,
};

const strToStr = {
  short: '< 4',
  medium: '< 16',
  long: '> 16',
};

const initPaths = (curriculum) => {
  Object.keys(curriculum.paths).forEach((pathId) => {
    const path = curriculum.paths[pathId];
    const completed = 0;
    const total = path.courseIds.length;

    path.nCompleted = completed;
    path.nTotal = total;
    path.completed = false;
    path.subjects = [];
    path.subjectNames = [];

    let accumulatedRating = 0;
    let accumulatedTime = 0;

    path.courseIds.forEach((courseId) => {
      const course = curriculum.courses[courseId];
      accumulatedRating += course.rating;
      accumulatedTime += course.estimatedTime;
      course.parentPathIds.push(pathId);
      course.subjects.forEach((subject) => {
        if (path.subjects.indexOf(subject) === -1) {
          path.subjects.push(subject);
          path.subjectNames.push(curriculum.subjects[subject].name);
        }
      });
      course.lessonIds.forEach((lessonId) => {
        const lesson = curriculum.lessons[lessonId];

        if (lesson.parentPathIds.indexOf(pathId) === -1) {
          lesson.parentPathIds.push(pathId);
        }
      });
    });
    path.rating = Math.floor(accumulatedRating / path.nTotal);
    path.estimatedTime = accumulatedTime;
    path.estimatedTimeStr = `> ${path.estimatedTime}`;
    path.url = `/paths/${pathId}`;
    path.img = `/paths/${pathId}.jpg`;
    path.id = pathId;
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
    course.subjectNames = [];
    course.parentPathIds = [];

    let accumulatedRating = 0;
    let accumulatedTime = 0;

    course.lessonIds.forEach((lessonId) => {
      const lesson = curriculum.lessons[lessonId];
      accumulatedRating += lesson.rating;
      accumulatedTime += strToTime[lesson.estimatedTime];
      lesson.parentCourseIds.push(courseId);
      lesson.subjects.forEach((subject) => {
        if (course.subjects.indexOf(subject) === -1) {
          course.subjects.push(subject);
          course.subjectNames.push(curriculum.subjects[subject].name);
        }
      });
    });
    course.rating = Math.floor(accumulatedRating / course.nTotal);
    course.estimatedTime = course.completeX ? Math.floor(accumulatedTime / course.nTotal * course.completeX) : accumulatedTime;
    course.url = `/courses/${courseId}`;
    course.id = courseId;
  });
};

const initLessons = (curriculum) => {
  let rating = 0;

  Object.keys(curriculum.lessons).forEach((lessonId) => {
    const lesson = curriculum.lessons[lessonId];
    lesson.parentCourseIds = [];
    lesson.parentPathIds = [];
    lesson.completed = false;
    lesson.url = `/lessons/${lessonId}`;
    lesson.subjectNames = [];
    lesson.subjects.forEach((subject) => {
      lesson.subjectNames.push(curriculum.subjects[subject].name);
    });
    rating += 1;
    lesson.rating = rating % 2 + 4;
    lesson.estimatedTimeStr = strToStr[lesson.estimatedTime];
    lesson.img = `/screenshots/${lessonId}.jpg`;
    lesson.id = lessonId;
  });
};

const init = (curriculum) => {
  initLessons(curriculum);
  initCourses(curriculum);
  initPaths(curriculum);

  return curriculum;
};

const getCurriculum = () => {
  // We need to create fresh copies or else
  // they might get 'polluted' by playing back actions on the redux store.
  const curriculum = {
    subjects: deepcopy(getAllSubjects()),
    paths: deepcopy(getAllPaths()),
    courses: deepcopy(getAllCourses()),
    lessons: deepcopy(getAllLessons()),
  };
  return init(curriculum);
};

export default getCurriculum;
