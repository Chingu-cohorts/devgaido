import React from 'react';
import PropTypes from 'prop-types';

import AnimateVisibleChildren from '../shared/AnimateVisibleChildren';
import { DashboardCard } from '../shared/Cards';

const ItemList = ({ items }) => (
  <div className="item-list">
    <AnimateVisibleChildren className="flex flex-wrap margin-vertical-big justify-around">
      {items.map(item => (
        <DashboardCard item={item} key={item.name} />
      ))}
    </AnimateVisibleChildren>
  </div>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemList;
