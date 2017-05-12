import CoreLearningPath from '../models/learningpath.json';

/**
 * Extract a unique list of unique subjects from the Core Learning Path 
 * 
 * @returns {String[]} - Array of subject names in ascending sequence
 */
const getSubjects = () => {
  return JSON.stringify(CoreLearningPath.reduce((uniqueList, currentElement) => {
    if (!uniqueList.includes(currentElement.Subject)) {
      uniqueList.push(currentElement.Subject);
    }
    return uniqueList;
  }, []).sort());
};

export { getSubjects };
