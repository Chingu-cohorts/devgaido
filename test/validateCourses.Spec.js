/* eslint-disable func-names prefer-arrow-callback */
require('./registerBabel');

import coreCourses from '../src/server/models/corecourses.json';
import coreLessons from '../src/server/models/corelessons.json';

const assert = require('assert');

/**
 * Check the validity of the corecourses.json file
 */
describe('Validate corecourses.json', function () {
  describe('Validate course id length', function () {
    let invalidCourseIds = [];
    afterEach(function() {
      invalidCourseIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Course id ${id} > 16 characters`);
      });
      invalidCourseIds = [];
    });
    it('should verify that course ids are <= 16 characters', function () {
      Object.keys(coreCourses).forEach((id) => {
        if (id.length > 16) {
          invalidCourseIds.push(id);
        }
      });
      assert.equal(invalidCourseIds.length, 0);
    });
  });
  describe('Validate course id composition', function () {
    let invalidCourseIds = [];
    afterEach(function() {
      invalidCourseIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Course id ${id} contains invalid characters`);
      });
      invalidCourseIds = [];
    });
    it('should verify that course ids contain only lowercase letters and digits', function () {
      Object.keys(coreCourses).forEach((id) => {
        if (!id.match(/^[0-9a-z]+$/)) {
          invalidCourseIds.push(id);
        }
      });
      assert.equal(invalidCourseIds.length, 0);
    });
  });
  describe('Validate lesson ids in the course exists', function () {
    let invalidIds = [];
    afterEach(function() {
      invalidIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Course id ${id[0]} contains unknown lesson id ${id[1]}`);
      });
      invalidIds = [];
    });
    it('should verify that lesson ids exist', function () {
      Object.values(coreCourses).forEach((currentCourse) => {
        currentCourse["lessonIds"].forEach((lessonId) => {
          if (coreLessons[lessonId] === undefined) {
            invalidIds.push([currentCourse["id"], lessonId]);
          }
        });
      });
      assert.equal(invalidIds.length, 0);
    });
  });
});
