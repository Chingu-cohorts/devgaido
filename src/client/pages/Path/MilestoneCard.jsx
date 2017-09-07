/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StateProvider from '../shared/StateProvider';

import actions from '../../actions';

const { toggleMilestoneCard } = actions;

/**
 * StateProvider is used to add state and life cycle hooks to MilestoneCard.
 */

  // When the card is opened the first time by the user,
  // enable transitions.
const toggleCollapsed = that => (id) => {
  if (!that.state.transitionAdded) {
    that.lessonContainerRef.style.transition = 'all 0.3s';
    that.setState({
      ...that.state,
      transitionAdded: true,
    });
  }
  toggleMilestoneCard(id);
};

  // The reference to the dom element has to be saved on the StateProvider's 'this' (=that)
  // since it will otherwise get lost.
const _constructor = (that) => {
  that.lessonContainerRef = null;
};

  // Grab the correct max-height value on first render, then update the state
  // to force a rerender in "uncollapsed" state.
  // Note that the transition has to be disabled at this point in time or the user would be
  // able to notice the card animating from uncollapsed to collapsed.
const componentDidMount = (that) => {
  that.setState({
    firstRender: false,
    transitionAdded: false,
    maxContentHeight: `${that.lessonContainerRef.clientHeight}px`,
  }, () => {
    that.lessonContainerRef.style.maxHeight = that.state.maxContentHeight;
  });
};

const shouldComponentUpdate = (that, nextProps) =>
  that.state.firstRender ||
    nextProps.uiState.openedMilestones.indexOf(that.props.id) !==
    that.props.uiState.openedMilestones.indexOf(that.props.id);

const MilestoneCard = ({ uiState, id, course, index, lessons, that, state }) => {
  const collapsed = state.firstRender ? false : uiState.openedMilestones.indexOf(id) === -1;

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
        className={`collapsible ${state.firstRender ? 'absolute opacity-0 pointer-events-none' : ''} ${collapsed ? 'collapsed' : 'padding-vertical-small'} bg-grey-blue border-round-bottom padding-horizontal-big margin-bottom-small`}
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
  state: PropTypes.objectOf(PropTypes.shape).isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  that: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  uiState: store.uiState,
}))(StateProvider(MilestoneCard, {
  firstRender: true,
  transitionAdded: false,
  maxContentHeight: '',
}, {
  _constructor,
  componentDidMount,
  shouldComponentUpdate,
}));
