import CoreSubjects from '../models/coresubjects.json';
import { collapseVersions } from './commonServices';

/**
 * Core Subject Model
 *
 * This module contains functions implementing model layer functionality
 * for the application.
 */

/*
 * Attribute directory defines all attribute names expected in the JSON object
 * and whether they are required or optional.
 */
const subjectAttributes = [
  ['type', 'required'],
  ['focusArea', 'required'],
  ['name', 'required'],
  ['description', 'required'],
  ['release', 'optional'],
  ['authorityUrl', 'optional'],
];
/**
 * Retrieve the array of attribute names and types.
 *
 * @returns {String[]} subjectAttributes - Array of expected attribute names and types
 */
const getExpectedAttributes = () => subjectAttributes;

/**
 * Extract a specific subject and its details from the Core Subjects
 *
 * @returns {String[]} - JSON object containing attributes of the subject
 */
const getSubject = (subjectId, overrideJSON) => {
  const subject = overrideJSON !== undefined ? overrideJSON[subjectId] : CoreSubjects[subjectId];
  if (subject === undefined) {
    return subject;
  }
  return collapseVersions(subject);
};

/**
 * Retrieve all subjects from the Core Subjects
 *
 * @param {any} overrideJSON - JSON subject object that is to be used instead of that
 * defined by CoreSubjects. This is an optional parameter used for testing
 * @returns {Object} - JSON object containing attributes of the core subject
 */
const getAllSubjects = (overrideJSON) => {
  const currentsubject = {};
  const subjects = overrideJSON !== undefined ? overrideJSON : CoreSubjects;
  Object.keys(subjects).forEach((key) => {
    currentsubject[key] = collapseVersions(subjects[key]);
  });
  return currentsubject;
};

export { getExpectedAttributes, getSubject, getAllSubjects };
