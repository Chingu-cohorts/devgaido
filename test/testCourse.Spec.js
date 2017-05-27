/* eslint-disable func-names prefer-arrow-callback */
const coreCourses = require('../src/server/services/coreCourses');
const assert = require('assert');

describe('Test coreCourses.js functions', function () {
  /**
   * Test the coreCourses.getCourse function
   */
  describe('Test the getCourse function', function () {
    it('should return the named course - "Understanding & Working with Git"', function () {
      assert.equal('Understanding & Working with Git', coreCourses.getCourse('10000').name);
    });
    it('should return undefined for an unknown course id', function () {
      assert.equal(undefined, coreCourses.getCourse('99999'));
    });
  });

  /**
   * Test the coreCourses.getAllCourses function
   */
  describe('Test the getAllCourses function', function () {
    it('should return multiple courses"', function () {
      assert.equal(coreCourses.getAllCourses() > 0, coreCourses.getAllCourses().length > 0);
    });
  });
});
