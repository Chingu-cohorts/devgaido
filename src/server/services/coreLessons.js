import CoreLessons from '../models/corelessons.json';

/**
 * Core Lessons Model
 *
 * This module contains functions implementing model layer functionality
 * for the application.
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
  ['subjects', 'required'],
  ['externalSource', 'required'],
  ['estimatedTime', 'required'],
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
