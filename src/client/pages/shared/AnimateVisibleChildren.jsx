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
  that.visibleChildren = [];
  that.hasDom = (typeof window !== 'undefined');
};

const animate = (that) => {
  that.visibleChildren.forEach((child) => {
    child.style.opacity = '1';
    child.style.transform = 'translateX(0)';
    child.style.transition = 'all 0.2s';
  });
};

const componentDidMount = (that) => {
  if (that.hasDom) {
    // divRef.children is an HTMLCollection so we need .slice to turn it
    // into a regular array
    that.childrenRefs = Array.prototype.slice.call(that.divRef.children);

    // Use requestAnimationFrame to make sure our code is run before the next repaint
    window.requestAnimationFrame(() => {
      that.childrenRefs.forEach((child) => {
        // Initialize all visible children
        if (child.getBoundingClientRect().top - window.pageYOffset <= window.innerHeight) {
          child.style.transform = 'translateX(-200px)';
          child.style.opacity = '0';
          that.visibleChildren.push(child);
        }
      });
      // Start animation before next repaint
      window.requestAnimationFrame(() => {
        animate(that);
      });
    });

    /*
      ** NOTE ON BUGGED BEHAVIOUR WHEN CHROME/FIREFOX DEV TOOLS ARE OPEN **
      (Works perfectly fine when dev tools are NOT open)
      ------------------------------------------------------------
      In some cases, when the Chrome Dev Tools pane is open (doesn't matter if on the left, right,
      bottom or extra window) the returned getBoundingClientRect().top is only correct for the
      first row of elements in the container. This makes it so that later elements trigger
      "too late" - the further down you scroll the more noticeable this becomes.
      (the discrepancy between the correct trigger y-pos and the point at which elements
      actually trigger gets bigger and bigger)
      It seems to be related to a weird issue where the height of elements
      is not correctly calculated.
      Logging with:
                      console.log([child]);
                      console.log(child.clientHeight);
      shows the correct clientHeight when clicking on the logged object in the console
      but the incorrect value for the second.
      When logging the child itself, the height will always differ from what .clientHeight
      or getBoundingClientRect().height will return by the exact amount you have
      to "scroll more" for the child element to actually trigger.
      There seems to be NO way to actually get this correct height value
      since when you try to access it in code, it will give you the incorrect value.
      Only when you look at the properties of the logged child in the console
      you can see the correct value.
      NOW HERE COMES THE KICKER!
      Firefox seems to have the same issue - only in reverse!
      So while the dev tools are open there, the elements will trigger too soon.
      Seemingly, I'm not the first person to have ever encountered this kind of issue as you
      can see from this Stackoverflow question:
      https://stackoverflow.com/questions/28413114/jquery-document-height-wrong-when-developer-tools-is-open
      A solution has yet to be discovered though.
    */
  }
};

const AnimateVisibleChildren = ({ className, children, that }) => (
  <div className={className} ref={(domElem) => { that.divRef = domElem; }}>
    {children}
  </div>
);

AnimateVisibleChildren.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
  that: PropTypes.objectOf(PropTypes.shape).isRequired,
};

AnimateVisibleChildren.defaultProps = {
  className: '',
};

export default StateProvider(AnimateVisibleChildren, {}, {
  _constructor,
  componentDidMount,
});
