/* eslint-disable func-names prefer-arrow-callback */
require('./registerBabel');

import corePaths from '../src/server/models/corepaths.json';

const assert = require('assert');

/**
 * Check the validity of the corepaths.json file
 */
describe('Validate corepaths.json', function () {
  describe('Validate path ids', function () {
    it('should verify that path ids are <= 16 characters', function () {
      const invalidPathIds = [];
      Object.keys(corePaths).forEach((id) => {
        if (id.length > 16) {
          console.log(`Path id ${id} > 16 characters`);
          invalidPathIds.push(id);
        }
      });
      assert.equal(invalidPathIds.length, 0);
    });
    it('should verify that path ids contain only letters and digits', function () {
      const invalidPathIds = [];
      Object.keys(corePaths).forEach((id) => {
        if (!id.match(/^[0-9a-z]+$/)) {
          console.log(`Path id ${id} not limited to just letters and digits`);
          invalidPathIds.push(id);
        }
      });
      assert.equal(invalidPathIds.length, 0);
    });
  });
});
