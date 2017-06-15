/* eslint-disable func-names prefer-arrow-callback */
require('./registerBabel');

import corePaths from '../src/server/models/corepaths.json';
import coreCourses from '../src/server/models/corecourses.json';

const assert = require('assert');

/**
 * Check the validity of the corepaths.json file
 */
describe('Validate corepaths.json', function () {
  describe('Validate path id length', function () {
    let invalidPathIds = [];
    afterEach(function() {
      invalidPathIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Path id ${id} > 16 characters`);
      });
      invalidPathIds = [];
    });
    it('should verify that path ids are <= 16 characters', function () {
      Object.keys(corePaths).forEach((id) => {
        if (id.length > 16) {
          invalidPathIds.push(id);
        }
      });
      assert.equal(invalidPathIds.length, 0);
    });
  });
  describe('Validate path id composition', function () {
    let invalidPathIds = [];
    afterEach(function() {
      invalidPathIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Path id ${id} contains invalid characters`);
      });
      invalidPathIds = [];
    });
    it('should verify that path ids contain only lowercase letters and digits', function () {
      Object.keys(corePaths).forEach((id) => {
        if (!id.match(/^[0-9a-z]+$/)) {
          invalidPathIds.push(id);
        }
      });
      assert.equal(invalidPathIds.length, 0);
    });
  });
  describe('Validate course ids in the path exists', function () {
    let invalidIds = [];
    afterEach(function() {
      invalidIds.forEach((id) => {
        console.log(`${' '.repeat(9)}Path id ${id[0]} contains unknown course id ${id[1]}`);
      });
      invalidIds = [];
    });
    it('should verify that course ids exist', function () {
      Object.values(corePaths).forEach((currentPath) => {
        currentPath["courseIds"].forEach((courseId) => {
          if (coreCourses[courseId] === undefined) {
            invalidIds.push([currentPath["id"], courseId]);
          }
        });
      });
      assert.equal(invalidIds.length, 0);
    });
  });
});
