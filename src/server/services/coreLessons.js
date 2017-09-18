import CoreLessons from '../models/corelessons.json';
import { collapseVersions } from './commonServices';

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

const getLesson = (lessonId, overrideJSON) => {
  const lesson = overrideJSON !== undefined ? overrideJSON[lessonId] : CoreLessons[lessonId];
  if (lesson === undefined) {
    return lesson;
  }
  return collapseVersions(lesson);
};

/**
 * Retrieve all lessons from the Core Lessons
 *
 * @param {any} overrideJSON - JSON lesson object that is to be used instead of that
 * defined by CoreLessons. This is an optional parameter used for testing
 * @returns {Object} - JSON object containing attributes of the core lesson
 */

const getAllLessons = (overrideJSON) => {
  const currentlesson = {};
  const lessons = overrideJSON !== undefined ? overrideJSON : CoreLessons;
  Object.keys(lessons).forEach((key) => {
    currentlesson[key] = collapseVersions(lessons[key]);
  });
  return currentlesson;
};

export { getExpectedAttributes, getLesson, getAllLessons };
