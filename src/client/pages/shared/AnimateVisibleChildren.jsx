/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';

import StateProvider from './StateProvider';

/*
  Since we cannot access the actual dom of the children directly in all cases
  (doesn't work for stateless components for example), we need to use the reference to our
  outer div and get access to the its children instead - this gives us access to
  the dom nodes corresponding to this.props.children.
*/

const _constructor = (that) => {
  that.divRef = null;
  that.childrenRefs = null;
  that.hasDom = (typeof window !== 'undefined');
  that.firstVisibleIndex = -1;
  that.lastVisibleIndex = -1;
};

const animate = (that) => {
  let child = null;
  for (let i = that.firstVisibleIndex; i <= that.lastVisibleIndex; i += 1) {
    child = that.childrenRefs[i];
    child.style.opacity = '1';
    child.style.transform = 'translateX(0)';
    child.style.transition = `all ${that.speed}s`;
    child.style.transitionDelay = `${i * that.stagger}s`;
  }
};

const isVisible = (bounds, windowHeight) =>
  (bounds.top >= 0 && bounds.top <= windowHeight) ||
  (bounds.bottom >= 0 && bounds.bottom <= windowHeight);

const componentDidMount = (that) => {
  if (that.hasDom) {
    // divRef.children is an HTMLCollection so we need .slice to turn it
    // into a regular array
    that.childrenRefs = Array.prototype.slice.call(that.divRef.children);

    // Use requestAnimationFrame to make sure our code is run before the next repaint
    window.requestAnimationFrame(() => {
      let atLeastOneVisibleChild = false;
      let child = null;
      let bounds = null;

      const windowHeight = window.innerHeight;

      that.firstVisibleIndex = -1;

      const alternate = that.alternate ? -1 : 1;
      let alternateMod = that.alternate ? -1 : 1;

      for (let i = 0; i < that.childrenRefs.length; i += 1) {
        child = that.childrenRefs[i];
        bounds = child.getBoundingClientRect();

        if (isVisible(bounds, windowHeight)) {
          if (that.firstVisibleIndex === -1) {
            that.firstVisibleIndex = i;
          }
          that.lastVisibleIndex = i;

          alternateMod *= alternate;
          child.style.transform = `translateX(${alternateMod * that.direction * 100}px)`;
          child.style.opacity = '0';

          atLeastOneVisibleChild = true;
        } else if (atLeastOneVisibleChild) {
          break;
        }
      }
      // Start animation before next repaint
      window.requestAnimationFrame(() => {
        animate(that);
      });
    });
  }
};

const componentDidUpdate = (that) => {
  if (!that.dontTriggerOnUpdate) {
    componentDidMount(that);
  }
};

const AnimateVisibleChildren = ({ className, children, that, speed = 0.2, stagger = 0.05, direction = -1, alternate = false, dontTriggerOnUpdate = false }) => {
  that.speed = speed;
  that.stagger = stagger;
  that.direction = direction;
  that.alternate = alternate;
  that.dontTriggerOnUpdate = dontTriggerOnUpdate;
  return (
    <div className={className} ref={(domElem) => { that.divRef = domElem; }}>
      {children}
    </div>
  );
};

AnimateVisibleChildren.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  that: PropTypes.objectOf(PropTypes.shape).isRequired,
  speed: PropTypes.number,
  stagger: PropTypes.number,
  direction: PropTypes.number,
  alternate: PropTypes.bool,
  dontTriggerOnUpdate: PropTypes.bool,
};

AnimateVisibleChildren.defaultProps = {
  className: '',
  speed: 0.2,
  stagger: 0.05,
  direction: 1,
  alternate: false,
  dontTriggerOnUpdate: false,
};

export default StateProvider(AnimateVisibleChildren, {}, {
  _constructor,
  componentDidMount,
  componentDidUpdate,
});
