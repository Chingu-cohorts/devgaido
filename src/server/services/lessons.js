import CoreLearningPath from '../models/learningpath.json';

/**
 * Extract a specific lesson and its details from the Core Learning Path 
 * 
 * @param {String} lessonId - Unique lesson identifier
 * @returns {String[]} - JSON object containing attributes of the lesson
 */
const getLesson = (lessonId) => {
  console.log(`Entered getLesson: ${lessonId}`);
  return JSON.stringify(CoreLearningPath.find((currentElement) => {
    return currentElement['Sequence #'] === lessonId;
  }));
};

/**
 * Extract lessons for a given subject from the Core Learning Path 
 * 
 * @param {String} subjectId - Unique subject identifier
 * @returns {String[]} - JSON object containing all lessons in ascending sequence for a subject  
 */
const getLessons = (subjectId) => {
  console.log('Entered getLessons: ${subjectId}');
  return JSON.stringify(CoreLearningPath.reduce((lessonsForSubject, currentElement) => {
    if (currentElement.Subject.toLowerCase() === subjectId.toLocaleLowerCase()) {
      lessonsForSubject.push(currentElement);
    }
    return lessonsForSubject;
  }, []));
};

const getAllLessons = () => {
  console.log('Entered getAllLessons');
  return CoreLearningPath;
};

export { getLesson, getLessons, getAllLessons };
