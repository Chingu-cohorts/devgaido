import CoreCourses from '../models/corecourses.json';

/**
 * Extract a specific course and its details from the Core Courses
 *
 * @param {String} lessonId - Unique path identifier
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getCourse = courseName => JSON.stringify(CoreCourses.find(currentCourse => currentCourse.name === courseName));

/**
 * Retrieve all courses and their details
 */
const getAllCourses = () => CoreCourses;

export { getCourse, getAllCourses };
