import CoreLessons from '../models/corelessons.json';

/**
 * Extract a specific lesson and its details from the Core Lessons
 *
 * @param {String} lessonId - Unique lesson identifier
 * @returns {String[]} - JSON object containing attributes of the lesson
 */
const getLesson = lessonId => CoreLessons[lessonId];

/**
 * Retrieve all lessons from the Core Lessons
 *
 * @returns {Object} - JSON object containing all lessons
 */
const getAllLessons = () => CoreLessons;

export { getLesson, getAllLessons };
