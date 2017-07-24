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
    return (
      <div>
        <div className="mcard cursor-pointer relative dot--big dot--empty flex-column border-round-top bg-white margin-top-small" onClick={() => this.toggleCollapsed()}>
          <div className="card__header flex align-items-center bg-primary border-round-top">
            <i className={`mcard__icon fa fa-caret-right c-white h2 margin-right-small ${this.state.collapsed ? '' : 'rotated'}`} />
            <h3 className="mcard__header__text flex-1 c-white uppercase no-margin">Milestone {this.props.index + 1}: {this.props.course.name}</h3>
          </div>
          <div className="flex margin-bottom-tiny">
            <div className="mcard__content-left flex-1 margin-left-small margin-top-small">
              <p>{this.props.course.description}</p>
            </div>
            <div className="mcard__content-right margin-left-huge margin-top-small margin-right-small">
              <div className="flex justify-space-between">
                <h6 className="normal">Rating</h6>
                <div>
                  <i className="fa fa-star c-secondary h4 margin-left-tiny" />
                  <i className="fa fa-star c-secondary h4 margin-left-tiny" />
                  <i className="fa fa-star c-secondary h4 margin-left-tiny" />
                  <i className="fa fa-star c-secondary h4 margin-left-tiny" />
                </div>
              </div>
              <div className="flex justify-space-between">
                <h6 className="normal">Estimated Length</h6>
                <div>
                  <h5 className="c-primary uppercase right no-margin">Very Long</h5>
                  <h6 className="c-primary uppercase right">(> 100 hours)</h6>
                </div>
              </div>
              <div className="flex justify-space-between">
                <h6 className="normal">Tags</h6>
                <div className="width-50 right">
                  <h6 className="tag center c-secondary border-pill border-1px border-secondary display-inline-block">HTML</h6>
                  <h6 className="tag center c-secondary border-pill border-1px border-secondary display-inline-block">Javascript</h6>
                  <h6 className="tag center c-secondary border-pill border-1px border-secondary display-inline-block">MongoDB</h6>
                  <h6 className="tag center c-secondary border-pill border-1px border-secondary display-inline-block">CSS</h6>
                </div>
              </div>
              <div className="flex justify-space-between margin-top-big">
                <h5 className="normal">Progress</h5>
                <div className="right">
                  <h3 className="right no-margin margin-left-big">
                    <i className={`fa fa-graduation-cap c-primary h3 right margin-left-big margin-right-tiny`} />
                    <span>{this.props.course.nCompleted}/{this.props.course.nTotal}</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`collapsible ${this.state.collapsed ? 'collapsed' : 'padding-vertical-small'} bg-grey-blue border-round-bottom padding-horizontal-big`}
          ref={(domElem) => { this.lessonContainerRef = domElem; }}
        >
          {this.props.lessons}
        </div>
      </div>);
  }
}

export default MilestoneCard;
