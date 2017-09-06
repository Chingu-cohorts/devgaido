/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StateProvider from '../shared/StateProvider';

import actions from '../../actions';

const { toggleMilestoneCard } = actions;

let collapsed;
let maxContentHeight;
let firstRender;
let transitionAdded;

const setValsForFirstRender = (that) => {
  collapsed = false;
  transitionAdded = false;
  maxContentHeight = null;
  firstRender = true;
  // The reference to the dom element has to be saved on the StateProvider's 'this' (=that)
  // since it will otherwise get lost.
  that.lessonContainerRef = null;
};

const grabHeightAndRerender = (that) => {
  maxContentHeight = `${that.lessonContainerRef.clientHeight}px`;
  that.lessonContainerRef.style.maxHeight = maxContentHeight;
  collapsed = true;
  firstRender = false;
  that.forceUpdate();
};

const toggleCollapsed = that => (id) => {
  if (!transitionAdded) {
    that.lessonContainerRef.style.transition = 'all 0.3s';
    transitionAdded = true;
    that.forceUpdate();
  }
  toggleMilestoneCard(id);
};

const _constructor = (that) => {
  setValsForFirstRender(that);
};

const componentDidMount = (that) => {
  grabHeightAndRerender(that);
};

const MilestoneCard = ({ uiState, id, course, index, lessons, that }) => {
  collapsed = firstRender ? false : uiState.openedMilestones.indexOf(id) === -1;

  return (
    <div className="">
      <div className={`mcard cursor-pointer relative dot--big ${!course.completed ? 'dot--empty' : ''} flex-column bg-white`} onClick={() => toggleCollapsed(that)(id)}>
        <div className={`flex padding-tiny items-center bg-primary transition-fast bg-hover-accent ${collapsed ? 'border-round' : 'border-round-top'}`}>
          <i className={`mcard__icon fa icon-caret-right c-white h2 margin-left-tiny margin-right-small ${collapsed ? '' : 'rotated'}`} />
          <h3 className="mcard__header__text flex-1 c-white uppercase no-margin wide">Milestone {index + 1}: {course.name}</h3>
          {!course.completed ?
            <h3 className="right no-margin margin-left-big c-white ">
              <i className={'fa icon-graduation-cap h3 right margin-left-big margin-right-tiny'} />
              <span className="margin-right-tiny">{course.nCompleted}/{course.nTotal}</span>
            </h3> :
            <h3 className="right no-margin margin-left-big c-white ">
              <i className={'mcard__checkmark fa icon-check-circle-o h2 margin-right-tiny'} />
              <i className={'mcard__flag fa icon-flag-checkered h2 absolute'} />
            </h3>
          }
        </div>
      </div>
      <div
        className={`collapsible ${firstRender ? 'absolute opacity-0 pointer-events-none' : ''} ${collapsed ? 'collapsed' : 'padding-vertical-small'} bg-grey-blue border-round-bottom padding-horizontal-big margin-bottom-small`}
        ref={(domElem) => { that.lessonContainerRef = domElem; }}
      >
        {course.completeX ?
          <h4 className="bg-white border-round padding-small bold">Complete at least {course.completeX} of the following lessons to finish this milestone:</h4> : null
        }
        {lessons}
      </div>
    </div>
  );
};

MilestoneCard.propTypes = {
  uiState: PropTypes.objectOf(PropTypes.shape).isRequired,
  course: PropTypes.objectOf(PropTypes.shape).isRequired,
  lessons: PropTypes.arrayOf(PropTypes.node).isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  that: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  uiState: store.uiState,
}))(StateProvider(MilestoneCard, {}, {
  _constructor,
  componentDidMount,
}));
