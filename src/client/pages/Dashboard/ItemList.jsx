import React from 'react';
import PropTypes from 'prop-types';

import { DashboardCard } from '../shared/Cards';

const ItemList = ({ items }) => (
  <div className="item-list">
    {items.map(item => (
      <DashboardCard item={item} key={item.name} />
    ))}
  </div>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemList;
