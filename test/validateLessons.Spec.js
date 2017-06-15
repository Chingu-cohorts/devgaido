/* eslint-disable func-names prefer-arrow-callback */
require('./registerBabel');

import coreLessons from '../src/server/models/corelessons.json';
import coreSubjects from '../src/server/models/coresubjects.json';

const assert = require('assert');

/**
 * Check the validity of the corecourses.json file
 */
describe('Validate corelessons.json', function () {
  describe('Validate lesson id length', function () {
    let invalidLessonIds = [];
    afterEach(function() {
      invalidLessonIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Lesson id ${id} > 16 characters`);
      });
      invalidLessonIds = [];
    });
    it('should verify that lesson ids are <= 16 characters', function () {
      Object.keys(coreLessons).forEach((id) => {
        if (id.length > 16) {
          invalidLessonIds.push(id);
        }
      });
      assert.equal(invalidLessonIds.length, 0);
    });
  });
  describe('Validate lesson id composition', function () {
    let invalidLessonIds = [];
    afterEach(function() {
      invalidLessonIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Lesson id ${id} contains invalid characters`);
      });
      invalidLessonIds = [];
    });
    it('should verify that lesson ids contain only lowercase letters and digits', function () {
      Object.keys(coreLessons).forEach((id) => {
        if (!id.match(/^[0-9a-z]+$/)) {
          invalidLessonIds.push(id);
        }
      });
      assert.equal(invalidLessonIds.length, 0);
    });
  });
  describe('Validate lesson ids in the course exists', function () {
    let invalidIds = [];
    afterEach(function() {
      invalidIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Lesson id ${id[0]} contains unknown subject id ${id[1]}`);
      });
      invalidIds = [];
    });
    it('should verify that subject ids exist', function () {
      Object.values(coreLessons).forEach((currentLesson) => {
        if (coreSubjects[currentLesson["subject"]] === undefined) {
          invalidIds.push([currentLesson["id"], currentLesson["subject"]]);
        }
      });
      assert.equal(invalidIds.length, 0);
    });
  });
});
