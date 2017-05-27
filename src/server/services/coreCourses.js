import CoreCourses from '../models/corecourses.json';

/**
 * Extract a specific course and its details from the Core Courses
 *
 * @param {String} courseId - Unique course identifier
 * @returns {String[]} - JSON object containing attributes of the course
 */
const getCourse = courseId => CoreCourses[courseId];

/**
 * Retrieve all courses and their details
 *
 * @returns {String[]} - JSON object containing all Core Courses
 */
const getAllCourses = () => CoreCourses;

export { getCourse, getAllCourses };
