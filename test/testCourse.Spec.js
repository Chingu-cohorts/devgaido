/* eslint-disable prefer-arrow-callback */
const coreCourses = require('../src/server/services/coreCourses');

const assert = require('assert');

describe('getCourse', function () {
  it('should return the named course - "Understanding & Working with Git"', function () {
    assert.equal('Understanding & Working with Git', coreCourses.getCourse('10000').name);
  });
});
