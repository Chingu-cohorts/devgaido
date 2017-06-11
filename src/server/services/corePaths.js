import CorePaths from '../models/corepaths.json';

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
