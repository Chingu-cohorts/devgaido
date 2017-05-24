import CoreSubjects from '../models/coresubjects.json';

/**
 * Extract a specific subject and its details from the Subjects
 *
 * @param {String} subjectId - Unique subject identifier
 * @returns {String[]} - JSON object containing subject details
 */
const getSubject = subjectId =>
  JSON.stringify(CoreSubjects.reduce((subjectsList, currentSubject) => {
    if (currentSubject.Name.toLowerCase() === subjectId.toLocaleLowerCase()
      && !subjectsList.includes(subjectId)) {
      subjectsList.push(currentSubject);
    }
    return subjectsList;
  }, []));

/**
 * Extract a unique list of unique subjects from the Core Subjects
 *
 * @returns {String[]} - Array of subject names in ascending sequence
 */
const getAllSubjects = () => CoreSubjects;

export { getSubject, getAllSubjects };
