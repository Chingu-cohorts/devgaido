/* eslint-disable func-names */
require('./registerBabel');

import assert from 'assert';
import { getPath, getAllPaths } from '../src/server/services/corePaths';
import corepaths from '../src/server/models/corepaths.json';
import testpaths from './testdata/testpaths.json';

/* Test data is kept in a separate file so production data is not contaminated */
const allPaths = {
  ...corepaths,
  ...testpaths,
};

describe('Test corePaths.js functions', () => {
  /**
   * Test the corePaths.getPath function
   */
  describe('Test the getPath function', () => {
    it('should return name "Become A Fullstack Developer (P1XT Guide)" for the named path"', () => {
      assert.equal('Become A Fullstack Developer (P1XT Guide)', getPath('p1xt', allPaths).name);
    });
    it('should return name "Webpage Design & Construction" for the named path"', () => {
      assert.equal('Webpage Design & Construction', getPath('webpagedc', allPaths).name);
    });
    it('should return undefined for an unknown path name "99999"', () => {
      assert.equal(undefined, getPath('99999', allPaths));
    });
  });

  /**
   * Test the corePaths.getAllPaths function
   */
  describe('Test the getAllPaths function', () => {
    it('should return multiple paths', () => {
      assert.equal(getAllPaths().length > 0, getAllPaths(allPaths).length > 0);
    });
  });
});
