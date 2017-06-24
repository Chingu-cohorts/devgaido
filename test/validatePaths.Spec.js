/* eslint-disable func-names no-console */
require('./registerBabel');

import { logErrors, logInvalidIds, logInvalidRelations,
  validateIdComposition, validateIdLength, validateRelationship,
  validateRequiredAttributes, validateUnknownAttributes } from './commonValidations';
import corePaths from '../src/server/models/corepaths.json';
import coreCourses from '../src/server/models/corecourses.json';

const assert = require('assert');

/**
 * Check the validity of the corepaths.json file
 */
describe('Validate corepaths.json', () => {
  describe('Validate attributes', () => {
    let invalidPathIds = [];
    const expectedAttributes = [
      ['name', 'required'],
      ['description', 'required'],
      ['courseIds', 'required'],
      ['version', 'required'],
    ];
    afterEach(() => {
      invalidPathIds = logErrors(invalidPathIds);
    });
    it('should verify that the path contains all required attributes', () => {
      invalidPathIds = validateRequiredAttributes(corePaths, expectedAttributes);
      assert.equal(invalidPathIds, 0);
    });
    it('should verify that there are no unknown attributes', () => {
      invalidPathIds = validateUnknownAttributes(corePaths, expectedAttributes);
      assert.equal(invalidPathIds, 0);
    });
  });
  describe('Validate path id length', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds = logInvalidIds(invalidPathIds, 'Path id > 16 characters');
    });
    it('should verify that path ids are <= 16 characters', () => {
      invalidPathIds = validateIdLength(corePaths);
      assert.equal(invalidPathIds.length, 1);
    });
  });
  describe('Validate path id composition', () => {
    let invalidPathIds = [];
    afterEach(() => {
      invalidPathIds = logInvalidIds(invalidPathIds, 'Path id contains invalid characters');
    });
    it('should verify that path ids contain only lowercase letters and digits', () => {
      invalidPathIds = validateIdComposition(corePaths);
      assert.equal(invalidPathIds.length, 1);
    });
  });
  describe('Validate course ids in the path exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds = logInvalidRelations('Path', 'Course', invalidIds);
    });
    it('should verify that course ids exist', () => {
      invalidIds = validateRelationship('courseIds', corePaths, 'courseId', coreCourses);
      assert.equal(invalidIds.length, 2);
    });
  });
});
