import CoreCourses from '../models/corecourses.json';

/**
 * Extract a specific path and its details from the Core Paths
 *
 * @param {String} lessonId - Unique path identifier
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getCourse = courseName => JSON.stringify(CoreCourses.find(currentCourse => currentCourse.name === courseName));

const getAllCourses = () => CoreCourses;

export { getCourse, getAllCourses };
