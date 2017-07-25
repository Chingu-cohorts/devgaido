import React from 'react';

class MilestoneCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.lessonContainerRef = null;
  }
  toggleCollapsed() {
    this.state = {
      collapsed: !this.state.collapsed,
    };
    this.forceUpdate();
  }
  componentDidMount() {
    this.lessonContainerRef.style.maxHeight = `${this.lessonContainerRef.clientHeight}px`;
    this.state = {
      collapsed: true,
    };
    this.forceUpdate();
  }
  render() {
    const ratingStars = [];
    for (let i = 0; i < this.props.course.rating; i += 1) {
      ratingStars.push(<i className="fa fa-star c-secondary h4 margin-left-tiny" />);
    }
    return (
      <div>
        <div className={`mcard cursor-pointer relative dot--big ${!this.props.course.completed ? 'dot--empty' : ''} flex-column bg-white`} onClick={() => this.toggleCollapsed()}>
          <div className={`card__header flex align-items-center bg-primary ${this.state.collapsed ? 'border-round' : 'border-round-top'}`}>
            <i className={`mcard__icon fa fa-caret-right c-white h2 margin-right-small ${this.state.collapsed ? '' : 'rotated'}`} />
            <h3 className="mcard__header__text flex-1 c-white uppercase no-margin">Milestone {this.props.index + 1}: {this.props.course.name}</h3>
            {!this.props.course.completed ?
              <h3 className="right no-margin margin-left-big c-white ">              
                <i className={`fa fa-graduation-cap h3 right margin-left-big margin-right-tiny`} />
                <span>{this.props.course.nCompleted}/{this.props.course.nTotal}</span>
              </h3> : 
              <h3 className="right no-margin margin-left-big c-white ">
                <i className={`mcard__checkmark fa fa-check-circle-o h0 absolute`} />
                <i className={`mcard__flag fa fa-flag-checkered h2 absolute`} />
              </h3>
            }
          </div>
        </div>
        <div
          className={`collapsible ${this.state.collapsed ? 'collapsed' : 'padding-vertical-small'} bg-grey-blue border-round-bottom padding-horizontal-big margin-bottom-small`}
          ref={(domElem) => { this.lessonContainerRef = domElem; }}
        >
          {this.props.lessons}
        </div>
      </div>);
  }
}

export default MilestoneCard;
