import React from 'react';
import PropTypes from 'prop-types';

import { LinkCard } from '../shared/Cards';

const bgColorLookUp = {
  paths: 'bg-primary',
  courses: 'bg-secondary',
  lessons: 'bg-primary',
};

const iconLookUp = {
  paths: 'fa-road',
  courses: 'fa-tasks',
  lessons: 'fa-graduation-cap',
};

const ItemList = ({ items, category }) => (
  <div className="item-list flex flex-wrap margin-bottom-huge">
    {items.map(item => (
      <LinkCard item={item} linkTo={item.url} bgColorClass={bgColorLookUp[category]} iconClass={iconLookUp[category]} heightClass="height-100" key={item.name} />
    ))}
  </div>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
};

export default ItemList;
