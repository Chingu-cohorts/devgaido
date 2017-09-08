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
 * Extract a specific path and its details from the Core Paths. Before returning the
 * JSON for the specified path id the version attributes must be collapsed into a
 * single JSON object. Version "1.0" is used as the base on to which changes from more
 * recent versions are folded into to create a single JSON object.
 *
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getPath = (pathId) => {
  let currentPath = CorePaths[pathId];
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
  console.log(`\n...Path keys: ${pathKeys}`);

  // Merge the current key attributes into its prececessor
  const mergedPath = pathKeys.reduce((mergedPath, currentPath) => {
    return { ...mergedPath, ...currentPath };
  }, []);
  console.log(`\n...Merged path: ${JSON.stringify(mergedPath)}`);

  /*
  console.log(`\nCurrent path: ${JSON.stringify(currentPath)}`);
  console.log(`\n...Object keys: ${Object.keys(currentPath)}`);
  console.log(`\n...Object values: ${JSON.stringify(Object.values(currentPath))}`);
  */
  return mergedPath;
};

/**
 * Retrieve all paths from the Core Paths
 *
 * @returns {Object} - JSON object containing attributes of the core path
 */
const getAllPaths = () => CorePaths;

export { getExpectedAttributes, getPath, getAllPaths };
