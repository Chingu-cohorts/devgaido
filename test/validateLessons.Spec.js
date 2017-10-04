/* eslint-disable func-names no-console */
require('./registerBabel');

import { logErrors, logInvalidRelations,
  validateIdComposition, validateIdLength,
  validateRequiredAttributes, validateUnknownAttributes,
  urlIsValid } from './commonValidations';
import { getExpectedAttributes, getAllLessons } from '../src/server/services/coreLessons';
import { getAllSubjects } from '../src/server/services/coreSubjects';
import { getAllCourses } from '../src/server/services/coreCourses';

const assert = require('assert');

const maxLessonIdLth = 24;

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
      invalidLessons = validateRequiredAttributes({ ...getAllLessons() }, getExpectedAttributes());
      assert.equal(invalidLessons.length, 0);
    });
    it('should verify that there are no unknown attributes', () => {
      invalidLessons = validateUnknownAttributes({ ...getAllLessons() }, getExpectedAttributes());
      assert.equal(invalidLessons.length, 0);
    });
  });
  describe('Validate lesson id length', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds = logErrors(invalidLessonIds);
    });
    it('should verify that lesson ids are <= 24 characters', () => {
      invalidLessonIds = validateIdLength({ ...getAllLessons() }, maxLessonIdLth);
      assert.equal(invalidLessonIds.length, 0);
    });
  });
  describe('Validate lesson id composition', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds = logErrors(invalidLessonIds);
    });
    it('should verify that lesson ids contain only lowercase letters and digits', () => {
      invalidLessonIds = validateIdComposition({ ...getAllLessons() });
      assert.equal(invalidLessonIds.length, 0);
    });
  });
  describe('Validate subject ids in the lesson exist', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds = logInvalidRelations('Lesson', 'Subject', invalidIds);
    });
    it('should verify that the associated subject ids exist', () => {
      const allSubjects = { ...getAllSubjects() };
      const allLessons = { ...getAllLessons() };
      Object.keys(allLessons).forEach((lessonId) => {
        allLessons[lessonId].subjects.forEach((subjectName) => {
          if (allSubjects[subjectName] === undefined) {
            invalidIds.push([lessonId, subjectName]);
          }
        });
      });
      assert.equal(invalidIds.length, 0);
    });
  });
  describe('Validate that there are no orphaned lessons', () => {
    let orphanedLessonIds = [];
    afterEach(() => {
      orphanedLessonIds = logErrors(orphanedLessonIds);
    });
    it('should verify that each lesson id is referenced by at least one course', () => {
      const allCourseLessons = Object.values({ ...getAllCourses() }).reduce((lessonReferences, course) => {
        course.lessonIds.forEach((lessonId) => {
          if (lessonReferences.indexOf(lessonId) === -1) {
            lessonReferences.push(lessonId);
          }
        });
        return lessonReferences;
      }, []);
      Object.keys({ ...getAllLessons() }).forEach((currentLessonId) => {
        if (allCourseLessons.indexOf(currentLessonId) === -1) {
          orphanedLessonIds.push(`ID:${currentLessonId} not referenced by any course`);
        }
      });
      assert.equal(orphanedLessonIds.length, 0);
    });
  });
});
