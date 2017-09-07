import CoreCourses from '../models/corecourses.json';

/**
 * Core Courses Model
 *
 * This module contains functions implementing model layer functionality
 * for the application.
 */

/*
 * Attribute directory defines all attribute names expected in the JSON object
 * and whether they are required or optional.
 */
const courseAttributes = [
  ['name', 'required'],
  ['description', 'required'],
  ['lessonIds', 'required'],
  ['version', 'required'],
];

/**
 * Retrieve the array of attribute names and types.
 *
 * @returns {String[]} courseAttributes - Array of expected attribute names and types
 */
const getExpectedAttributes = () => courseAttributes;

/**
 * Extract a specific course and its details from the Core Courses
 *
 * @returns {String[]} - JSON object containing attributes of the course or
 * undefined if no match found
 */
const getCourse = courseId => CoreCourses[courseId];

/**
 * Retrieve all courses and their details
 *
 * @returns {String[]} - JSON object containing all Core Courses
 */
const getAllCourses = () => CoreCourses;

export { getExpectedAttributes, getCourse, getAllCourses };
