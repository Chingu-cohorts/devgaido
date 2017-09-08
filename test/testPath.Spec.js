/* eslint-disable func-names */
require('./registerBabel');
const corePaths = require('../src/server/services/corePaths');
const assert = require('assert');

describe('Test corePaths.js functions', function () {
  /**
   * Test the corePaths.getPath function
   */
  describe('Test the getPath function', function () {
    it('should return name "Become A Fullstack Developer (P1XT Guide)" for the named path"', function () {
      assert.equal('Become A Fullstack Developer (P1XT Guide)', corePaths.getPath('p1xt').name);
    });
    it('should return name "Webpage Design & Construction" for the named path"', function () {
      assert.equal('Webpage Design & Construction', corePaths.getPath('webpagedc').name);
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
