/* eslint-disable func-names no-console */
require('./registerBabel');

import { logErrors, logInvalidRelations,
  validateIdComposition, validateIdLength,
  validateRequiredAttributes, validateUnknownAttributes,
  urlIsValid } from './commonValidations';
import { getExpectedAttributes } from '../src/server/services/coreLessons';
import coreLessons from '../src/server/models/corelessons.json';
import testLessons from './testdata/testlessons.json';
import coreSubjects from '../src/server/models/coresubjects.json';
import coreCourses from '../src/server/models/corecourses.json';

const assert = require('assert');

/* Test data is kept in a separate file so production data is not contaminated */
const allLessons = {
  ...coreLessons,
  ...testLessons,
};
/**
 * Check the validity of the corelessons.json file
 */
describe('Validate corelessons.json', () => {
  describe('Validate attributes', () => {
    let invalidLessons = [];
    afterEach(() => {
      invalidLessons = logErrors(invalidLessons);
    });
    it('should verify that the lesson contains all required attributes', () => {
      invalidLessons = validateRequiredAttributes(allLessons, getExpectedAttributes());
      assert.equal(invalidLessons, 0);
    });
    it('should verify that there are no unknown attributes', () => {
      invalidLessons = validateUnknownAttributes(allLessons, getExpectedAttributes());
      assert.equal(invalidLessons, 0);
    });
  });
  describe('Validate lesson id length', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds = logErrors(invalidLessonIds);
    });
    it('should verify that lesson ids are <= 16 characters', () => {
      invalidLessonIds = validateIdLength(allLessons);
      assert.equal(invalidLessonIds.length, 1);
    });
  });
  describe('Validate lesson id composition', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds = logErrors(invalidLessonIds);
    });
    it('should verify that lesson ids contain only lowercase letters and digits', () => {
      invalidLessonIds = validateIdComposition(allLessons);
      assert.equal(invalidLessonIds.length, 1);
    });
  });
  describe('Validate lesson ids in the course exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds = logInvalidRelations('Lesson', 'Subject', invalidIds);
    });
    it('should verify that subject ids exist', () => {
      Object.values(allLessons).forEach((currentLesson) => {
        if (coreSubjects[currentLesson.subject] === undefined) {
          invalidIds.push([currentLesson.id, currentLesson.subject]);
        }
      });
      assert.equal(invalidIds.length, 2);
    });
  });
  describe('Validate that there are no orphaned lessons', () => {
    let orphanedLessonIds = [];
    afterEach(() => {
      orphanedLessonIds = logErrors(orphanedLessonIds);
    });
    it('should verify that each lesson id is referenced by at least one course', () => {
      const allCourseLessons = Object.values(coreCourses).reduce((lessonReferences, course) => {
        course.lessonIds.forEach((lessonId) => {
          if (lessonReferences.indexOf(lessonId) === -1) {
            lessonReferences.push(lessonId);
          }
        });
        return lessonReferences;
      }, []);
      Object.keys(allLessons).forEach((currentLessonId) => {
        if (allCourseLessons.indexOf(currentLessonId) === -1) {
          orphanedLessonIds.push(`ID:${currentLessonId} not referenced by any course`);
        }
      });
      assert.equal(orphanedLessonIds.length, 2);
    });
  });
});
