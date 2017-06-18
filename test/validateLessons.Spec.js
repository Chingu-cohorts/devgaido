/* eslint-disable func-names no-console */
require('./registerBabel');

import { logInvalidIds, logInvalidRelations,
  validateIdComposition, validateIdLength, validateIdMatch } from './commonValidations';
import coreLessons from '../src/server/models/corelessons.json';
import coreSubjects from '../src/server/models/coresubjects.json';

const assert = require('assert');

/**
 * Check the validity of the corelessons.json file
 */
describe('Validate corelessons.json', () => {
  describe('Validate lesson id length', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds = logInvalidIds(invalidLessonIds, 'Lesson id > 16 characters');
    });
    it('should verify that lesson ids are <= 16 characters', () => {
      invalidLessonIds = validateIdLength(coreLessons);
      assert.equal(invalidLessonIds.length, 0);
    });
  });
  describe('Validate lesson id composition', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds = logInvalidIds(invalidLessonIds, 'Lesson id contains invalid characters');
    });
    it('should verify that lesson ids contain only lowercase letters and digits', () => {
      invalidLessonIds = validateIdComposition(coreLessons);
      assert.equal(invalidLessonIds.length, 0);
    });
  });
  describe('Validate block key matches internal "id" value', () => {
    let invalidLessonIds = [];
    afterEach(() => {
      invalidLessonIds = logInvalidIds(invalidLessonIds, 'Lesson id does not match "id" value');
    });
    it('should verify that block key and "id" value match', () => {
      invalidLessonIds = validateIdMatch(coreLessons);
      assert.equal(invalidLessonIds.length, 0);
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
      assert.equal(invalidIds.length, 0);
    });
  });
});
