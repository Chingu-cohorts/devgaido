import React from 'react';
import PropTypes from 'prop-types';

import { LinkCard } from '../shared/Cards';

const bgColorLookUp = {
  paths: 'bg-primary',
  courses: 'bg-secondary',
  lessons: 'bg-secondary',
};

const iconLookUp = {
  paths: 'icon-map-signs',
  courses: 'icon-flag-checkered',
  lessons: 'icon-graduation-cap',
};

const childIconLookUp = {
  paths: 'icon-flag-checkered c-primary',
  courses: 'icon-graduation-cap c-secondary',
  lessons: '',
};

const ItemList = ({ items, category }) => (
  <div className="item-list flex flex-wrap">
    {items.map(item => (
      <LinkCard
        item={item}
        linkTo={item.url}
        bgColorClass={bgColorLookUp[category]}
        iconClass={iconLookUp[category]}
        childIconClass={childIconLookUp[category]}
        heightClass="height-100"
        key={item.name}
        imgSrc={item.img}
        pathId={category === 'paths' ? item.id : undefined}
      />
    ))}
  </div>
);

ItemList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
};

export default ItemList;
