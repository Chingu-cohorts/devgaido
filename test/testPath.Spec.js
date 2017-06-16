/* eslint-disable func-names */
require('./registerBabel');
const corePaths = require('../src/server/services/corePaths');
const assert = require('assert');

describe('Test corePaths.js functions', function () {
  /**
   * Test the corePaths.getPath function
   */
  describe('Test the getPath function', function () {
    it('should return id "webpagedc" for the named path"', function () {
      assert.equal('webpagedc', corePaths.getPath('webpagedc').id);
    });
    it('should return undefined for an unknown path name "99999"', function () {
      assert.equal(undefined, corePaths.getPath('99999'));
    });
  });

  /**
   * Test the corePaths.getAllPaths function
   */
  describe('Test the getAllPaths function', function () {
    it('should return multiple paths', function () {
      assert.equal(corePaths.getAllPaths().length > 0, corePaths.getAllPaths().length > 0);
    });
  });
});
