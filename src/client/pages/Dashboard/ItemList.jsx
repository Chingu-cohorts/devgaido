import React from 'react';
import PropTypes from 'prop-types';

import AnimateVisibleChildren from '../shared/AnimateVisibleChildren';
import { DashboardCard } from '../shared/Cards';

const ItemList = ({ items }) => (
  <AnimateVisibleChildren className="item-list">
    {items.map(item => (
      <DashboardCard item={item} key={item.name} />
    ))}
  </AnimateVisibleChildren>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemList;
