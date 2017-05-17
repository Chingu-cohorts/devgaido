import CorePaths from '../models/corepaths.json';

/**
 * Extract a specific path and its details from the Core Paths
 *
 * @param {String} lessonId - Unique path identifier
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getPath = pathId => JSON.stringify(CorePaths.find(currentPath => currentPath.name === pathId));

const getAllPaths = () => CorePaths;

export { getPath, getAllPaths };
