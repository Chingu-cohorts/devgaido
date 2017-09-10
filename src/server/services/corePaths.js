import CorePaths from '../models/corepaths.json';
import { collapseVersions } from './commonServices';

/**
 * Core Paths Model
 *
 * This module contains functions implementing model layer functionality

 * for the application. All access to the path model must be made through
 * these functions since they collapse versions in the path to create a
 * single view of the information contained in the path.
 */

/*
 * Attribute directory defines all attribute names expected in the JSON object
 * and whether they are required or optional.
 */
const pathAttributes = [
  ['name', 'required'],
  ['description', 'required'],
  ['courseIds', 'required'],
  ['goal', 'optional'],
  ['salary', 'optional'],
];

/**
 * Retrieve the array of attribute names and types.
 *
 * @returns {String[]} pathAttributes - Array of expected attribute names and types
 */
const getExpectedAttributes = () => pathAttributes;

/**
<<<<<<< HEAD
 * Extract a specific path and its details from the Core Paths
 *
=======
 * Extract a specific path and its details from the Core Paths.
 *{}
 * @param {String} pathId - Identifier of the path that is to be returned
 * @param {any} overrideJSON - JSON path object that is to be used instead of that
 * defined by CorePaths. This is an optional parameter used for testing
>>>>>>> 41f30a4e11692a8ceeb36bb3e991c89883538f66
 * @returns {String[]} - JSON object containing attributes of the path
 */
const getPath = (pathId, overrideJSON) => {
  const path = overrideJSON !== undefined ? overrideJSON[pathId] : CorePaths[pathId];
  if (path === undefined) {
    return path;
  }
  return collapseVersions(path);
};

/**
 * Retrieve all paths from the Core Paths
 *
 * @param {any} overrideJSON - JSON path object that is to be used instead of that
 * defined by CorePaths. This is an optional parameter used for testing
 * @returns {Object} - JSON object containing attributes of the core path
 */
const getAllPaths = (overrideJSON) => {
  const currentPath = {};
  const paths = overrideJSON !== undefined ? overrideJSON : CorePaths;
  Object.keys(paths).forEach((key) => {
    currentPath[key] = collapseVersions(paths[key]);
  });
  return currentPath;
};

export { getExpectedAttributes, getPath, getAllPaths };
