/* eslint-disable func-names prefer-arrow-callback */
const coreLessons = require('../src/server/services/coreLessons');
const assert = require('assert');

describe('Test coreLessons.js functions', function () {
  /**
   * Test the coreLessons.getLesson function
   */
  describe('Test the getLesson function', function () {
    it('should return the named lesson - "Git - the simple guide"', function () {
      assert.equal('Git - the simple guide', coreLessons.getLesson('200200').name);
    });
    it('should return undefined for an unknown lesson id', function () {
      assert.equal(undefined, coreLessons.getLesson('99999'));
    });
  });

  /**
   * Test the coreLessons.getAllLessons function
   */
  describe('Test the getAllLessons function', function () {
    it('should return multiple lessons"', function () {
      assert.equal(coreLessons.getAllLessons() > 0, coreLessons.getAllLessons().length > 0);
    });
  });
});
