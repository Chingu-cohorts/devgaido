import React from 'react';

import actions from '../../actions';

const { toggleMilestoneCard } = actions;

class MilestoneCard extends React.Component {
  constructor(props) {
    super(props);
    this.collapsed = false;

    this.lessonContainerRef = null;
    this.maxContentHeight = null;
    this.firstRender = true;
  }
  componentDidMount() {
    this.collapsed = true;
    this.firstRender = false;
    this.maxContentHeight = `${this.lessonContainerRef.clientHeight + 40}px`;
    this.lessonContainerRef.style.maxHeight = this.maxContentHeight;
    this.forceUpdate();
  }
  toggleCollapsed(id) {
    this.lessonContainerRef.style.transition = 'all 0.3s';
    toggleMilestoneCard(id);
  }
  render() {
    const ratingStars = [];
    for (let i = 0; i < this.props.course.rating; i += 1) {
      ratingStars.push(<i className="fa icon-star c-secondary h4 margin-left-tiny" />);
    }
    this.collapsed = this.firstRender ? false : this.props.uiState.openedMilestones.indexOf(this.props.id) === -1;
    return (
      <div className="">
        <div className={`mcard cursor-pointer relative dot--big ${!this.props.course.completed ? 'dot--empty' : ''} flex-column bg-white`} onClick={() => this.toggleCollapsed(this.props.id)}>
          <div className={`card__header flex align-items-center bg-primary ${this.collapsed ? 'border-round' : 'border-round-top'}`}>
            <i className={`mcard__icon fa icon-caret-right c-white h2 margin-right-small ${this.collapsed ? '' : 'rotated'}`} />
            <h3 className="mcard__header__text flex-1 c-white uppercase no-margin">Milestone {this.props.index + 1}: {this.props.course.name}</h3>
            {!this.props.course.completed ?
              <h3 className="right no-margin margin-left-big c-white ">
                <i className={'fa icon-graduation-cap h3 right margin-left-big margin-right-tiny'} />
                <span>{this.props.course.nCompleted}/{this.props.course.nTotal}</span>
              </h3> :
              <h3 className="right no-margin margin-left-big c-white ">
                <i className={'mcard__checkmark fa icon-check-circle-o h0 absolute'} />
                <i className={'mcard__flag fa icon-flag-checkered h2 absolute'} />
              </h3>
            }
          </div>
        </div>
        <div
          className={`collapsible ${this.firstRender ? 'absolute opacity-0 pointer-events-none' : ''} ${this.collapsed ? 'collapsed' : 'padding-vertical-small'} bg-grey-blue border-round-bottom padding-horizontal-big margin-bottom-small`}
          ref={(domElem) => { this.lessonContainerRef = domElem; }}
        >
          {this.props.course.completeX ?
            <h4 className="bg-white border-round padding-small bold">Complete at least {this.props.course.completeX} of the following lessons to finish this milestone:</h4> : null
          }
          {this.props.lessons}
        </div>
      </div>);
  }
}

export default MilestoneCard;
