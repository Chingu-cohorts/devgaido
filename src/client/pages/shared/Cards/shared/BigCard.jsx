import React from 'react';
import PropTypes from 'prop-types';

import AnimateVisibleChildrenDiv from '../../../shared/AnimateVisibleChildrenDiv';

const BigCard = ({ children }) => (
  <AnimateVisibleChildrenDiv dontTriggerOnUpdate className="container padding-horizontal-0-below-m">
    <div className="flex width-100 bg-white padding-horizontal-big padding-horizontal-tiny-below-m padding-vertical-big padding-vertical-tiny-below-m border-round margin-bottom-small page-hero__offset">
      <AnimateVisibleChildrenDiv dontTriggerOnUpdate className="width-100">
        {children}
      </AnimateVisibleChildrenDiv>
    </div>
  </AnimateVisibleChildrenDiv>
);

BigCard.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default BigCard;
