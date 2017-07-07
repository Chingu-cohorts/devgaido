import React from 'react';
import PropTypes from 'prop-types';

import { LinkCard } from '../shared/Cards';

const ItemList = ({ items, category }) => (
  <div className="path-list flex flex-wrap margin-bottom-huge">
    {items.map(item => (
      <LinkCard item={item} linkTo={item.linkTo} bgColorClass="bg-primary" iconClass="fa-road" heightClass="height-100" key={item.name} />
    ))}
  </div>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  curriculum: PropTypes.objectOf(PropTypes.shape).isRequired,
  category: PropTypes.string.isRequired,
};

export default ItemList;
