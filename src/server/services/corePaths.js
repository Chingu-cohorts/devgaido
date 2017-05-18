import CorePaths from '../models/corepaths.json';
import { getFullCourses } from './coreCourses';

/**
 * Extract a specific path and its details from the Core Paths
 *
 * @param {String} pathName - Unique path identifier
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getPath = pathName => JSON.stringify(
  CorePaths.find(currentPath => currentPath.name === pathName));

/**
 * Retrieve all paths from the Core Paths
 *
 * @returns {Object} - JSON object containing attributes of the core path
 */
const getAllPaths = () => CorePaths;

/**
 * Build a JSON document containing the full representation of the Core Path,
 * and it's relationships. Namely, the Core Courses owned by each path and the
 * Core Lessons owned by each course.
 *
 * @returns {Object} - JSON object containing all paths, courese, and lessons.
 */
const getFullPaths = () => {
  CorePaths.reduce((fullPath, currentPath) => {
    const coursesInPath = getFullCourses(currentPath.courses);
    return fullPath.push(coursesInPath);
  }, []);
};

export { getPath, getAllPaths, getFullPaths };
