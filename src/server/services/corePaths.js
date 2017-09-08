import CorePaths from '../models/corepaths.json';

/**
 * Core Paths Model
 *
 * This module contains functions implementing model layer functionality
 * for the application. The JSON file referenced by this module has the
 * following structure:
 *
 * {
 *   "path-identifier" : { <-- Unique path identifier. Max of 16 chars.
 *     "version-n.n": {    <-- Version specific changes
 *                               1. "version-1.0" must contain values for all required
 *                                  attributes and must be the last version in the JSON
 *                                  object.
 *                               2. New version blocks must be added to the top of the
 *                                  JSON object. Version block occur from the most recent
 *                                  to the oldest (i.e. "version-1.0") within the path JSON.
 *        "name": "...",        <-- Short path name
 *        "description": "...", <-- Path description. Must describe the knowledge
 *                                  the user should expect to achieve from taking
 *                                  the courses in this path.
 *        "courseIds": [        <-- Array of unique course id's contained in the path.
 *                                  Course id's can be referenced in more than one path.
 *          "...",              <-- Course id
 *        ],
 *     }
 *   },
 * }
 */

/*
 * Attribute directory defines all attribute names expected in the JSON object
 * and whether they are required or optional.
 */
const pathAttributes = [
  ['name', 'required'],
  ['description', 'required'],
  ['courseIds', 'required'],
  ['version', 'required'],
  ['goal', 'optional'],
  ['salary', 'optional'],
];

/**
 * Retrieve the array of attribute names and types.
 *
 * @returns {String[]} pathAttributes - Array of expected attribute names and types
 */
const getExpectedAttributes = () => pathAttributes;

/**
 * Collapse all versions of a path into a single JSON object.  Version "1.0" is used
 * as the base on to which changes from more recent versions are folded into to create
 * a single JSON object.
 *
 * @returns {String[]} - A collapsed JSON object containing the combined attributes
 * from all versions
 */
const collapsePath = (currentPath) => {
  const pathKeys = Object.keys(currentPath)
    .sort((a, b) => {
      const nameA = a.toUpperCase(); // ignore upper and lowercase
      const nameB = b.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      // names must be equal
      return 0;
    });
  // Merge each set of attributes from the oldest version to the most recent version. This
  // results in a single JSON object that contains the modification from all versions of
  // the path.
  const collapsedPath = pathKeys.reduce((combinedPath, currentIndex) =>
    ({ ...combinedPath, ...currentPath[currentIndex] }), []);
  console.log(`collapsedPath: ${JSON.stringify(collapsedPath)}`);
  return collapsedPath;
};

/**
 * Extract a specific path and its details from the Core Paths.
 *
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getPath = pathId => collapsePath(CorePaths[pathId]);

/**
 * Retrieve all paths from the Core Paths
 *
 * @returns {Object} - JSON object containing attributes of the core path
 */
const getAllPaths = () => CorePaths;

export { getExpectedAttributes, getPath, getAllPaths };
