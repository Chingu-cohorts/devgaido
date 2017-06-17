/* eslint-disable func-names no-console */
require('./registerBabel');

import { logInvalidIds, validateIdComposition, validateIdLength, validateRelationship } from './commonValidations';
import coreCourses from '../src/server/models/corecourses.json';
import coreLessons from '../src/server/models/corelessons.json';

const assert = require('assert');

/**
 * Check the validity of the corecourses.json file
 */
describe('Validate corecourses.json', () => {
  describe('Validate course id length', () => {
    let invalidCourseIds = [];
    afterEach(() => {
      invalidCourseIds = logInvalidIds(invalidCourseIds, 'Course id > 16 characters');
    });
    it('should verify that course ids are <= 16 characters', () => {
      invalidCourseIds = validateIdLength(coreCourses);
      assert.equal(invalidCourseIds.length, 0);
    });
  });
  describe('Validate course id composition', () => {
    let invalidCourseIds = [];
    afterEach(() => {
      invalidCourseIds = logInvalidIds(invalidCourseIds, 'Course id contains invalid characters');
    });
    it('should verify that course ids contain only lowercase letters and digits', () => {
      invalidCourseIds = validateIdLength(coreCourses);
      assert.equal(invalidCourseIds.length, 0);
    });
  });
  describe('Validate lesson ids in the course exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Course id ${id[0]} contains unknown lesson id ${id[1]}`);
      });
      invalidIds = [];
    });
    it('should verify that lesson ids exist', () => {
      invalidIds = validateRelationship('lessonIds', coreCourses, 'lessonId', coreLessons);
      assert.equal(invalidIds.length, 0);
    });
  });
});
