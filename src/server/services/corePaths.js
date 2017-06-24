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
 *   "name": "...",        <-- Short path name
 *   "description": "...", <-- Path description. Must describe the knowledge
 *                             the user should expect to achieve from taking
 *                             the courses in this path.
 *   "courseIds": [        <-- Array of unique course id's contained in the path.
 *                             Course id's can be referenced in more than one path.
 *     "...",                  <-- Course id
 *   ],
 *   "version": "1.0.0"    <-- Semantic version to track changes
 *  },
 * }
 */

/**
 * Extract a specific path and its details from the Core Paths
 *
 * @param {String} pathName - Unique path identifier
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getPath = pathName => CorePaths[pathName];

/**
 * Retrieve all paths from the Core Paths
 *
 * @returns {Object} - JSON object containing attributes of the core path
 */
const getAllPaths = () => CorePaths;

export { getPath, getAllPaths };
