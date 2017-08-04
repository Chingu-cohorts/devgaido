import React from 'react';
// import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import { MenuCard } from './Cards';
import Auth0LockWidget from './Auth0LockWidget';

import actions from '../../actions';

const { toggleNavMenu } = actions;

const handleLoginClick = (e, auth0) => {
  e.preventDefault();
  const lock = Auth0LockWidget(auth0);
  lock.show();
};

class StickyNav extends React.Component {
  constructor(props) {
    super(props);
    this.sticky = false;
    this.hasDom = (typeof window !== 'undefined');
    this.lastScrollPos = 0;
    this.scrollDown = undefined;
    this.navBarHeight = undefined;
    this.distanceToScrollUntilSticky = 0;
  }

  componentDidMount() {
    if (this.hasDom) {
      this.navBarHeight = this.navbarRef.clientHeight;

      this.navbarRefPlaceholder.style.height = `${this.navBarHeight}px`;
      this.distanceToScrollUntilSticky = this.navBarHeight;

      window.addEventListener('scroll', () => this.handleScroll());
    }
  }

  componentWillUnmount() {
    if (this.hasDom) {
      window.removeEventListener('scroll', () => this.handleScroll());
    }
  }

  handleScroll() {
    let sticky = false;
    this.scrollingDown = (window.pageYOffset - this.lastScrollPos) > 0;
    this.lastScrollPos = window.pageYOffset;

    if (this.scrollingDown) {
      sticky = window.pageYOffset > this.distanceToScrollUntilSticky;
      if (sticky) {
        this.navbarRef.style.opacity = 0;
        this.navbarRef.style.transform = `translateY(-${this.navBarHeight}px)`;
      }
    }

    if (!this.scrollingDown) {
      sticky = window.pageYOffset !== 0;
      this.navbarRef.style.transition = 'all 0.5s';
      this.navbarRef.style.opacity = 1;
      this.navbarRef.style.transform = 'translateY(0)';
    }

    if (sticky !== this.sticky) {
      this.sticky = sticky;
      this.navbarRef.style.transition = 'all 0s';
      this.forceUpdate();
    }
    /* TODO: Fix following issue:
      When a transform is set, the z-index is ignored which would make the MenuCard appear "below"
      the PageHero when scrolled up to the top. The fix below tries to stop all css animations (opacity + transform)
      and then removes the transform to make z-index work again, but for some reason the opacity animation that is playing
      is ignoring setting transition = 'all 0s'. This makes it so that the animation still plays out regardless and
      the attempted removal of the transform occurs only AFTER 0.5s instead of instantaneous.
      We tried everything to make this fix 100% functional to no avail.
      The issue however, only occurs in the edge case of having the menu open when scrolled down and then super quickly
      scrolling up to the very top so that the navbar should lose its 'fixed' property, so for now we leave it as is.
    */
    // Start of fix
    if (window.pageYOffset === 0) {
      requestAnimationFrame(() => {
        this.navbarRef.style.opacity = 1;
        this.navbarRef.style.transform = 'translateY(0)';
        this.navbarRef.style.transition = 'all 0s';
        this.forceUpdate();
        requestAnimationFrame(() => {
          this.navbarRef.style.transform = '';
        });
      });
    }
    // End of fix
  }
  render() {
    const { user, uiState, auth0 } = this.props;

    return (
      <div className={`width-100 bg-white`} ref={(domElem) => { this.navbarRefPlaceholder = domElem; }}>
        <div className={`navbar width-100 bg-white ${this.sticky ? 'fixed' : ''}`} ref={(domElem) => { this.navbarRef = domElem; }}>
          <div className="container flex justify-space-between align-items-center padding-vertical-small relative">
            <NavLink to={user.authenticated ? '/dashboard' : '/'} className="logo" />
            <nav className="flex align-items-center">
              <ul className="flex align-items-center no-margin list-style-none uppercase">
                <li className="margin-right-small"><NavLink to="/library" activeClassName="boxshadow-underline bold">Library</NavLink></li>
                {user.authenticated ? <li className="margin-right-small"><NavLink to="/dashboard" activeClassName="boxshadow-underline bold">Dashboard</NavLink></li> : null}
              </ul>
              {user.authenticated ? <img className="avatar circle-border subtle-border cursor-pointer" src={user.avatar} alt="avatar" role="button" onClick={() => toggleNavMenu()} /> : null}
              {!user.authenticated ? <a className="button button--primary-clear uppercase" href="/" onClick={e => handleLoginClick(e, auth0)} title="Login">L‌‌o‌‌g‌‌i‌‌n‌</a> : null}
            </nav>
            <div className={uiState.navMenuOpen ? 'menu absolute' : 'menu absolute hidden'}>
              <MenuCard username={user.name}>
                <ul className="list-style-none no-margin">
                  <li className="margin-bottom-small"><NavLink to="/profile" className="uppercase left" activeClassName="bold" onClick={() => toggleNavMenu()}><i className="fa icon-user h5 c-secondary margin-right-small" aria-hidden="true" /> Profile</NavLink></li>
                  <li><a className="uppercase left" href="/logout"><i className="fa icon-sign-out h5 c-secondary margin-right-small" aria-hidden="true" />Logout</a></li>
                </ul>
              </MenuCard>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default StickyNav;

