/* eslint-disable func-names prefer-arrow-callback */
require('./registerBabel');
const coreLessons = require('../src/server/services/coreLessons');
const assert = require('assert');

describe('Test coreLessons.js functions', function () {
  /**
   * Test the coreLessons.getLesson function
   */
  describe('Test the getLesson function', function () {
    it('should return the lesson for id "gitsimpleguide" - "Git - the simple guide"', function () {
      assert.equal('Git - the simple guide', coreLessons.getLesson('gitsimpleguide').name);
    });
    it('should return undefined for an unknown lesson id "99999"', function () {
      assert.equal(undefined, coreLessons.getLesson('99999'));
    });
  });

  /**
   * Test the coreLessons.getAllLessons function
   */
  describe('Test the getAllLessons function', function () {
    it('should return multiple lessons', function () {
      assert.equal(coreLessons.getAllLessons().length > 0, coreLessons.getAllLessons().length > 0);
    });
  });
});
