import React from 'react';
import PropTypes from 'prop-types';

import { LinkCard } from '../shared/Cards';

const ItemList = ({ items }) => (
  <div className="item-list">
    {items.map(item => (
      <LinkCard item={item} key={item.name} />
    ))}
  </div>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ItemList;
