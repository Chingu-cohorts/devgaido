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
 * Extract a specific path and its details from the Core Paths
 *
 * @param {String} pathName - Unique path identifier
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getPath = (pathName) => {
  console.log(`path:${CorePaths[pathName]}`);
  return CorePaths[pathName];
};

/**
 * Retrieve all paths from the Core Paths
 *
 * @returns {Object} - JSON object containing attributes of the core path
 */
const getAllPaths = () => {
  console.log(`paths: ${CorePaths}`);
  return CorePaths;
};

export { getExpectedAttributes, getPath, getAllPaths };
