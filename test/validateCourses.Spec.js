/* eslint-disable import/first func-names no-console */
require('./registerBabel');

import { logErrors, logInvalidRelations,
  validateIdComposition, validateIdLength, validateRelationship,
  validateRequiredAttributes, validateUnknownAttributes } from './commonValidations';
import { getAllCourses, getExpectedAttributes } from '../src/server/services/coreCourses';
import { getAllLessons } from '../src/server/services/coreLessons';
import { getAllPaths } from '../src/server/services/corePaths';

const assert = require('assert');

const maxCourseIdLth = 24;

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
      invalidCourses = validateRequiredAttributes({ ...getAllCourses() }, getExpectedAttributes());
      assert.equal(invalidCourses, 0);
    });
    it('should verify that there are no unknown attributes', () => {
      invalidCourses = validateUnknownAttributes({ ...getAllCourses() }, getExpectedAttributes());
      assert.equal(invalidCourses, 0);
    });
  });
  describe('Validate course id length', () => {
    let invalidCourseIds = [];
    afterEach(() => {
      invalidCourseIds = logErrors(invalidCourseIds);
    });
    it('should verify that course ids are <= 24 characters', () => {
      invalidCourseIds = validateIdLength({ ...getAllCourses() }, maxCourseIdLth);
      assert.equal(invalidCourseIds.length, 0);
    });
  });
  describe('Validate course id composition', () => {
    let invalidCourseIds = [];
    afterEach(() => {
      invalidCourseIds = logErrors(invalidCourseIds);
    });
    it('should verify that course ids contain only lowercase letters and digits', () => {
      invalidCourseIds = validateIdComposition({ ...getAllCourses() });
      assert.equal(invalidCourseIds.length, 0);
    });
  });
  describe('Validate lesson ids in the course exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds = logInvalidRelations('Course', 'Lesson', invalidIds);
    });
    it('should verify that lesson ids exist', () => {
      invalidIds = validateRelationship('lessonIds', { ...getAllCourses() }, 'lessonId', { ...getAllLessons() });
      assert.equal(invalidIds.length, 0);
    });
  });
  describe('Vaidate that there are no orphaned courses', () => {
    let orphanedCourseIds = [];
    afterEach(() => {
      orphanedCourseIds = logErrors(orphanedCourseIds);
    });
    it('should verify that each course id is referenced by at least one path', () => {
      const allPathCourses = Object.values({ ...getAllPaths() }).reduce((courseReferences, path) => {
        path.courseIds.forEach((courseId) => {
          if (courseReferences.indexOf(courseId) === -1) {
            courseReferences.push(courseId);
          }
        });
        return courseReferences;
      }, []);
      Object.keys({ ...getAllCourses() }).forEach((currentCourseId) => {
        if (allPathCourses.indexOf(currentCourseId) === -1) {
          orphanedCourseIds.push(`ID:${currentCourseId} not referenced by any path`);
        }
      });
      assert.equal(orphanedCourseIds.length, 0);
    });
  });
});
