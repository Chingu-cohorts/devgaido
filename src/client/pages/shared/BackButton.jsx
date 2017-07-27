import React from 'react';
// import PropTypes from 'prop-types';

class BackButton extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = null;
    this.sticky = false;
    this.hasDom = (typeof window !== 'undefined');
    this.absoluteTop = 0;
    this.absoluteLeft = 0;
    this.fixedTop = 0;
    this.fixedLeft = 0;
  }

  componentDidMount() {
    if (this.hasDom) {
      window.addEventListener('scroll', () => this.handleScroll());
    }
  }

  componentWillUnmount() {
    if (this.hasDom) {
      window.removeEventListener('scroll', () => this.handleScroll());
    }
  }

  handleScroll() {
    const sticky = window.pageYOffset > this.absoluteTop;
    if (sticky !== this.sticky) {
      this.sticky = sticky;
      if (sticky) {
        this.absoluteTop = this.buttonRef.offsetParent.clientHeight + 20;
        this.fixedLeft = this.buttonRef.offsetParent.offsetLeft;
        this.buttonRef.style.left = `${this.fixedLeft}px`;
        this.buttonRef.style.top = `${0}px`;
      } else {
        this.buttonRef.style.left = `${0}px`;
        this.buttonRef.style.top = `${this.absoluteTop}px`;
      }
      this.forceUpdate();
    }
  }

  render() {
    const notOnHomeScreen = this.props.history.location.pathname !== '/';
    return (
      <button
        className={`back-button border-none ${notOnHomeScreen ? '' : 'hidden'} ${this.sticky ? 'fixed bg-secondary' : ''}`}
        onClick={this.props.history.goBack}
        ref={(domElem) => { this.buttonRef = domElem; }}
      >
        <i className="fa fa-arrow-left h0" />
      </button>
    );
  }
}

export default BackButton;

