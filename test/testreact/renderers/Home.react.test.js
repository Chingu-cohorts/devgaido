/* test/testreact/renderers */

import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../../src/client/pages/Home/Home';

it('renders correctly', () => {
  const tree = renderer
    .create(Home)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
