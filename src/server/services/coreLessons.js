import CoreLessons from '../models/corelessons.json';

/**
 * Core Lessons Model
 *
 * This module contains functions implementing model layer functionality
 * for the application. The JSON file referenced by this module has the
 * following structure:
 *
 * {
 *  "path-identifier" : {          <-- Unique lesson identifier. Max of 16 chars.
 *    "source": "...",             <-- Textual definition of the lessons origin (e.g. P1XT)
 *    "name": "...",               <-- Short lesson name
 *    "description": "...",        <-- Lesson description. This should describe
 *                                     the lesson, as well as what knowledge will
 *                                     be provided to the user.
 *    "type": "...",               <-- Lesson type categorizes the medium used to
 *                                     transmit the information (e.g. reading, video, etc.)
 *    "Instructions": "...",       <-- For "type": "Project" this describes what
 *                                     is expected of the user
 *    "resources":                 <-- For "type": "Project" this defines relevant
 *                                     supplemental material
 *      [["resource-description","resource-url"],...],
 *    "subject-identifier": "...", <-- Relates the lesson to a specific subject
 *    "externalSource": "...",     <-- Defines the url of the lesson
 *   "version": "1.0.0"            <-- Semantic version to track changes
 *  },
 * }
 */

/*
 * Attribute directory defines all attribute names expected in the JSON object
 * and whether they are required or optional.
 */
const lessonAttributes = [
  ['source', 'required'],
  ['name', 'required'],
  ['description', 'required'],
  ['type', 'required'],
  ['instructions', 'optional'],
  ['resources', 'optional'],
  ['subject', 'required'],
  ['externalSource', 'required'],
  ['version', 'required'],
];

/**
 * Retrieve the array of attribute names and types.
 *
 * @returns {String[]} lessonAttributes - Array of expected attribute names and types
 */
const getExpectedAttributes = () => lessonAttributes;

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

export { getExpectedAttributes, getLesson, getAllLessons };
