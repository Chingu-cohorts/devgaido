import CoreLearningPath from '../models/learningpath.json';

/**
 * Extract a specific subject and its details from the Core Learning Path 
 * 
 * @param {String} subjectId - Unique subject identifier
 * @returns {String[]} - JSON object containing subject details
 */
// TODO: Add details other than just subject name once subjects have been defined
const getSubject = (subjectId) => {
  console.log(`Entered getSubject: ${subjectId}`);
  return JSON.stringify(CoreLearningPath.reduce((uniqueList, currentElement) => {
    if (currentElement.Subject.toLowerCase() === subjectId.toLocaleLowerCase() && !uniqueList.includes(subjectId)) {
      uniqueList.push(currentElement.Subject);
    }
    return uniqueList;
  }, []));
};

/**
 * Extract a unique list of unique subjects from the Core Learning Path 
 * 
 * @returns {String[]} - Array of subject names in ascending sequence
 */
const getSubjects = () => {
  console.log('Entered getSubjects');
  return JSON.stringify(CoreLearningPath.reduce((uniqueList, currentElement) => {
    if (!uniqueList.includes(currentElement.Subject)) {
      uniqueList.push(currentElement.Subject);
    }
    return uniqueList;
  }, []).sort());
};

export { getSubject, getSubjects };
