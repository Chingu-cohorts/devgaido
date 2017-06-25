import CoreCourses from '../models/corecourses.json';

/**
 * Core Courses Model
 *
 * This module contains functions implementing model layer functionality
 * for the application. The JSON file referenced by this module has the
 * following structure:
 *
 * {
 *  "course-identifier" : { <-- Unique path identifier. Max of 16 chars.
 *    "name": "...",        <-- Short course name
 *    "description": "...", <-- Course description must define the objective
 *                              of the course and what the user can expect to
 *                              gain from it.
 *    "lessonIds": [        <-- Array of lesson ids included in the course
 *      "...",              <-- Lesson identifier
 *    ],
 *    "version": "1.0.0"    <-- Semantic version to track changes
 *  },
 * }
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
 * @param {String} courseId - Unique course identifier
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
