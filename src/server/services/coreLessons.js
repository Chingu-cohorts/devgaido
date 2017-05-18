import CoreLessons from '../models/corelessons.json';

/**
 * Extract a specific lesson and its details from the Core Lessons
 *
 * @param {String} lessonId - Unique lesson identifier
 * @returns {String[]} - JSON object containing attributes of the lesson
 */
const getLesson = lessonId => JSON.stringify(CoreLessons.find(currentElement => currentElement['Sequence #'] === lessonId));

/**
 * Extract lessons for a given subject from the Core Lessons
 * @param {String} subjectId - Unique subject identifier
 * @returns {String[]} - JSON object containing all lessons in ascending sequence for a subject
 */
const getLessons = subjectId => JSON.stringify(CoreLessons.reduce((lessonsForSubject, currentLesson) => {
  if (currentLesson.Subject.toLowerCase() === subjectId.toLocaleLowerCase()) {
    lessonsForSubject.push(currentLesson);
  }
  return lessonsForSubject;
}, []));

/**
 * Retrieve all lessons from the Core Lessons
 */
const getAllLessons = () => CoreLessons;

export { getLesson, getLessons, getAllLessons };
