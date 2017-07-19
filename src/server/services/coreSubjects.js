import CoreSubjects from '../models/coresubjects.json';

/**
 *
 * Core Subject Model
 *
 * This module contains functions implementing model layer functionality
 * for the application. The JSON file referenced by this module has the
 * following structure:
 *
 * {
 *  "subject-identifier" : { <-- Unique subject identifier. Max of 16 chars.
 *    "type": "...",         <-- Subject type which categorizes the associated
 *                               subject material (e.g. CSS, HTML, Javascript, etc.)
 *    "focusArea": "...",    <-- Subject focus area based on a specific webdev
 *                               role (e.g. Frontend, Backend, Fullstack, etc.)
 *    "name": "...",         <-- Short subject name
 *    "description": "...",  <-- Subject description describing the associated
 *                               subject material and how it relates to the
 *                               webdev role.
 *    "releaseNo": "...",    <-- Defines the release number for the associated
 *                               technology the subject may be based on (e.g.
 *                               Angular2 vs. Angular4)
 *    "authorityURL": "...", <-- For specific technologies the subject is based
 *                               on this notes the URL of the authorative
 *                               source. For example, for Google's Material
 *                               Design this would be www.materialdesign.io.
 *    "version": "1.0.0"     <-- Semantic version to track changes
 *  },
 * }
 */

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
