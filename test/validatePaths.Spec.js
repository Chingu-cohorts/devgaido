/* eslint-disable func-names no-console */
require('./registerBabel');

import { logErrors, logInvalidRelations,
  validateIdComposition, validateIdLength, validateRelationship,
  validateRequiredAttributes, validateUnknownAttributes } from './commonValidations';
import { getExpectedAttributes } from '../src/server/services/corePaths';
import corePaths from '../src/server/models/corepaths.json';
import testPaths from './testdata/testpaths.json';
import coreCourses from '../src/server/models/corecourses.json';

const assert = require('assert');

/* Test data is kept in a separate file so production data is not contaminated */
const allPaths = {
  ...corePaths,
  ...testPaths,
};

/**
 * Check the validity of the corepaths.json file
 */
describe('Validate corepaths.json', () => {
  describe('Validate attributes', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds = logErrors(invalidPathIds);
    });
    it('should verify that the path contains all required attributes', () => {
      invalidPathIds = validateRequiredAttributes(allPaths, getExpectedAttributes());
      assert.equal(invalidPathIds.length, 0);
    });
    it('should verify that there are no unknown attributes', () => {
      invalidPathIds = validateUnknownAttributes(allPaths, getExpectedAttributes());
      assert.equal(invalidPathIds.length, 1);
    });
  });
  describe('Validate path id length', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds = logErrors(invalidPathIds);
    });
    it('should verify that path ids are <= 16 characters', () => {
      invalidPathIds = validateIdLength(allPaths);
      assert.equal(invalidPathIds.length, 1);
    });
  });
  describe('Validate path id composition', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds = logErrors(invalidPathIds);
    });
    it('should verify that path ids contain only lowercase letters and digits', () => {
      invalidPathIds = validateIdComposition(allPaths);
      assert.equal(invalidPathIds.length, 1);
    });
  });
  describe('Validate course ids in the path exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds = logInvalidRelations('Path', 'Course', invalidIds);
    });
    it('should verify that course ids exist', () => {
      invalidIds = validateRelationship('courseIds', allPaths, 'courseId', coreCourses);
      assert.equal(invalidIds.length, 2);
    });
  });
});
