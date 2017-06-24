/* eslint-disable func-names no-console */
require('./registerBabel');

import { logErrors, logInvalidIds, logInvalidRelations,
  validateIdComposition, validateIdLength,
  validateRequiredAttributes, validateUnknownAttributes } from './commonValidations';
import coreLessons from '../src/server/models/corelessons.json';
import coreSubjects from '../src/server/models/coresubjects.json';
import coreCourses from '../src/server/models/corecourses.json';

const assert = require('assert');

/**
 * Check the validity of the corelessons.json file
 */
describe('Validate corelessons.json', () => {
  describe('Validate attributes', () => {
    let invalidLessons = [];
    const expectedAttributes = [
      ['source', 'required'],
      ['name', 'required'],
      ['description', 'required'],
      ['type', 'required'],
      ['instructions', 'optional'],
      ['resources', 'optional'],
      ['subject', 'required'],
      ['externalSource', 'required'],
      ['version', 'required'],
    ];
    afterEach(() => {
      invalidLessons = logErrors(invalidLessons);
    });
    it('should verify that the lesson contains all required attributes', () => {
      invalidLessons = validateRequiredAttributes(coreLessons, expectedAttributes);
      assert.equal(invalidLessons, 0);
    });
    it('should verify that there are no unknown attributes', () => {
      invalidLessons = validateUnknownAttributes(coreLessons, expectedAttributes);
      assert.equal(invalidLessons, 0);
    });
  });
  describe('Validate lesson id length', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds = logInvalidIds(invalidLessonIds, 'Lesson id > 16 characters');
    });
    it('should verify that lesson ids are <= 16 characters', () => {
      invalidLessonIds = validateIdLength(coreLessons);
      assert.equal(invalidLessonIds.length, 1);
    });
  });
  describe('Validate lesson id composition', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds = logInvalidIds(invalidLessonIds, 'Lesson id contains invalid characters');
    });
    it('should verify that lesson ids contain only lowercase letters and digits', () => {
      invalidLessonIds = validateIdComposition(coreLessons);
      assert.equal(invalidLessonIds.length, 1);
    });
  });
  describe('Validate lesson ids in the course exists', () => {
    let invalidIds = [];
    afterEach(() => {
      invalidIds = logInvalidRelations('Lesson', 'Subject', invalidIds);
    });
    it('should verify that subject ids exist', () => {
      Object.values(coreLessons).forEach((currentLesson) => {
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
      orphanedLessonIds = logInvalidIds(orphanedLessonIds, 'Lesson id not referenced by any course');
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
      Object.keys(coreLessons).forEach((currentLessonId) => {
        if (allCourseLessons.indexOf(currentLessonId) === -1) {
          orphanedLessonIds.push(currentLessonId);
        }
      });
      assert.equal(orphanedLessonIds.length, 2);
    });
  });
});
