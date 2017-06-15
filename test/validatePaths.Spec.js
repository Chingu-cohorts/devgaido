/* eslint-disable func-names prefer-arrow-callback no-console */
require('./registerBabel');

import { validateIdComposition, validateIdLength, validateRelationship } from './commonValidations';
import corePaths from '../src/server/models/corepaths.json';
import coreCourses from '../src/server/models/corecourses.json';

const assert = require('assert');

/**
 * Check the validity of the corepaths.json file
 */
describe('Validate corepaths.json', () => {
  describe('Validate path id length', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Path id ${id} > 16 characters`);
      });
      invalidPathIds = [];
    });
    it('should verify that path ids are <= 16 characters', () => {
      invalidPathIds = validateIdLength(corePaths);
      assert.equal(invalidPathIds.length, 0);
    });
  });
  describe('Validate path id composition', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Path id ${id} contains invalid characters`);
      });
      invalidPathIds = [];
    });
    it('should verify that path ids contain only lowercase letters and digits', () => {
      invalidPathIds = validateIdComposition(corePaths);
      assert.equal(invalidPathIds.length, 0);
    });
  });
  describe('Validate course ids in the path exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Path id ${id[0]} contains unknown course id ${id[1]}`);
      });
      invalidIds = [];
    });
    it('should verify that course ids exist', () => {
      invalidIds = validateRelationship('courseIds', corePaths, 'courseId', coreCourses);
      assert.equal(invalidIds.length, 0);
    });
  });
});
