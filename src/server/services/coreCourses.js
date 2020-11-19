import CoreCourses from '../models/corecourses.json';
import { collapseVersions } from './commonServices';
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
  ['completeX', 'optional'],
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

const getCourse = (courseId, overrideJSON) => {
  const course = overrideJSON !== undefined ? overrideJSON[courseId] : CoreCourses[courseId];
  if (course === undefined) {
    return course;
  }
  return collapseVersions(course);
};
/**
 * Retrieve all subjects from the Core Courses
 *
 * @param {any} overrideJSON - JSON course object that is to be used instead of that
 * defined by CoreCources. This is an optional parameter used for testing
 * @returns {Object} - JSON object containing attributes of the core course
 */

const getAllCourses = (overrideJSON) => {
  const currentcourse = {};
  const courses = overrideJSON !== undefined ? overrideJSON : CoreCourses;
  Object.keys(courses).forEach((key) => {
    currentcourse[key] = collapseVersions(courses[key]);
  });
  return currentcourse;
};
export { getExpectedAttributes, getCourse, getAllCourses };
