/* eslint-disable import/first func-names no-console */
require('./registerBabel');

import { logErrors, logInvalidRelations,
  validateIdComposition, validateIdLength, validateRelationship,
  validateRequiredAttributes, validateUnknownAttributes } from './commonValidations';
import { getExpectedAttributes } from '../src/server/services/coreCourses';
import coreCourses from '../src/server/models/corecourses.json';
import coreLessons from '../src/server/models/corelessons.json';
import corePaths from '../src/server/models/corepaths.json';

const assert = require('assert');

/**
 * Check the validity of the corecourses.json file
 */
describe('Validate corecourses.json', () => {
  describe('Validate attributes', () => {
    let invalidCourses = [];
    afterEach(() => {
      invalidCourses = logErrors(invalidCourses);
    });
    it('should verify that the course contains all required attributes', () => {
      invalidCourses = validateRequiredAttributes(coreCourses, getExpectedAttributes());
      assert.equal(invalidCourses, 0);
    });
    it('should verify that there are no unknown attributes', () => {
      invalidCourses = validateUnknownAttributes(coreCourses, getExpectedAttributes());
      assert.equal(invalidCourses, 0);
    });
  });
  describe('Validate course id length', () => {
    let invalidCourseIds = [];
    afterEach(() => {
      invalidCourseIds = logErrors(invalidCourseIds);
    });
    it('should verify that course ids are <= 16 characters', () => {
      invalidCourseIds = validateIdLength(coreCourses);
      assert.equal(invalidCourseIds.length, 1);
    });
  });
  describe('Validate course id composition', () => {
    let invalidCourseIds = [];
    afterEach(() => {
      invalidCourseIds = logErrors(invalidCourseIds);
    });
    it('should verify that course ids contain only lowercase letters and digits', () => {
      invalidCourseIds = validateIdComposition(coreCourses);
      assert.equal(invalidCourseIds.length, 1);
    });
  });
  describe('Validate lesson ids in the course exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds = logInvalidRelations('Course', 'Lesson', invalidIds);
    });
    it('should verify that lesson ids exist', () => {
      invalidIds = validateRelationship('lessonIds', coreCourses, 'lessonId', coreLessons);
      assert.equal(invalidIds.length, 2);
    });
  });
  describe('Vaidate that there are no orphaned lessons', () => {
    let orphanedCourseIds = [];
    afterEach(() => {
      orphanedCourseIds = logErrors(orphanedCourseIds);
    });
    it('should verify that each course id is referenced by at least one path', () => {
      const allPathCourses = Object.values(corePaths).reduce((courseReferences, path) => {
        path.courseIds.forEach((courseId) => {
          if (courseReferences.indexOf(courseId) === -1) {
            courseReferences.push(courseId);
          }
        });
        return courseReferences;
      }, []);
      Object.keys(coreCourses).forEach((currentCourseId) => {
        if (allPathCourses.indexOf(currentCourseId) === -1) {
          orphanedCourseIds.push(`ID:${currentCourseId} not referenced by any path`);
        }
      });
      assert.equal(orphanedCourseIds.length, 1);
    });
  });
});
