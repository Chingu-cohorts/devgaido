import React from 'react';
// import PropTypes from 'prop-types';


import { NavLink } from 'react-router-dom';
import { MenuCard } from '../shared/Cards';
import BackButton from './BackButton';

import actions from '../../actions';

const { toggleNavMenu } = actions;

const handleLoginClick = (e, lock) => {
  e.preventDefault();
  lock.show();
};
class StickyNav extends React.Component {
  constructor(props) {
    super(props);
    this.buttonRef = null;
    this.sticky = false;
    this.hasDom = (typeof window !== 'undefined');
    this.absoluteTop = 0;
    this.absoluteLeft = 0;
    this.fixedTop = 0;
    this.fixedLeft = 0;
    this.wasSticky = false;
    this.lastScrollPos = 0;
    this.scrollDir = 0;
    this.navBarHeight = undefined;
  }

  componentDidMount() {
    if (this.hasDom) {
      window.addEventListener('scroll', () => this.handleScroll());
      this.navbarRefPlaceholder.style.height = `${78}px`;
    }
  }

  componentWillUnmount() {
    if (this.hasDom) {
      window.removeEventListener('scroll', () => this.handleScroll());
    }
  }

  handleScroll() {
    let sticky = false;
    this.scrollDir = window.pageYOffset - this.lastScrollPos;
    this.lastScrollPos = window.pageYOffset;

    if (this.scrollDir > 0 && window.pageYOffset > 78) {
      this.navbarRef.style.opacity = 0;
    } else {
      this.navbarRef.style.opacity = 1;
    }
    //if (this.scrollDir < 0) {
    sticky = window.pageYOffset > 78;
    //}

    if (sticky !== this.sticky) {
      if (sticky) {

        this.navbarRef.style.transition = 'all 0.5s';
        /*requestAnimationFrame(() => {
          if (!this.navBarHeight) {
            this.navBarHeight = `${this.navbarRef.clientHeight}px`;
          }

          this.navbarRef.style.maxHeight = `${0}px`;
          this.navbarRef.style.opacity = 0;
          this.navbarRef.style.transition = 'all 0s';

          requestAnimationFrame(() => {
            this.navbarRef.style.maxHeight = this.navBarHeight;
            this.navbarRef.style.transition = 'all 0.5s';
            this.navbarRef.style.opacity = 1;
          });
        });*/
        this.navbarRef.style.top = `${0}px`;
        this.navbarRef.style.zIndex = 999;
        
      } else {
        this.navbarRef.style.transition = 'all 0s';
      }
/*
      if (this.scrollDir > 0) {
        //this.navbarRef.style.maxHeight = `${0}px`;
        this.navbarRef.style.background = 'red';
        //this.navbarRef.style.transition = 'all 0.5s';
      } else {
        this.navbarRef.style.background = 'blue';
      }
  */    

      this.sticky = sticky;
      this.forceUpdate();
    }
  }

  render() {
    const { user, uiState, lock, history } = this.props;
    return (
      <div className={`width-100 bg-primary`} ref={(domElem) => { this.navbarRefPlaceholder = domElem; }}>
        <div className={`width-100 bg-white ${this.sticky ? 'fixed' : ''} overflow-hidden`} ref={(domElem) => { this.navbarRef = domElem; }}>
          <div className="container flex justify-space-between align-items-center padding-vertical-small relative">
            <NavLink to={user.authenticated ? '/dashboard' : '/'} className={`logo ${this.sticky ? 'logo--displaced' : ''}`} />
            <nav className="flex align-items-center">
              <ul className="flex align-items-center no-margin list-style-none uppercase">
                <li className="margin-right-small"><NavLink to="/library" activeClassName="boxshadow-underline bold">Library</NavLink></li>
                {user.authenticated ? <li className="margin-right-small"><NavLink to="/dashboard" activeClassName="boxshadow-underline bold">Dashboard</NavLink></li> : null}
              </ul>
              {user.authenticated ? <img className="avatar circle-border subtle-border cursor-pointer" src={user.avatar} alt="avatar" role="button" onClick={() => toggleNavMenu()} /> : null}
              {!user.authenticated ? <a className="button button--primary-clear uppercase" href="/" onClick={e => handleLoginClick(e, lock)} title="Login">L‌‌o‌‌g‌‌i‌‌n‌</a> : null}
            </nav>
            <div className={uiState.global.navMenuOpen ? 'menu absolute' : 'menu absolute hidden'}>
              <MenuCard username={user.name}>
                <ul className="list-style-none no-margin">
                  <li className="margin-bottom-small"><NavLink to="/profile" className="uppercase left" activeClassName="bold" onClick={() => toggleNavMenu()}><i className="fa fa-user h5 c-secondary margin-right-small" aria-hidden="true" /> Profile</NavLink></li>
                  <li><a className="uppercase left" href="/logout"><i className="fa fa-sign-out h5 c-secondary margin-right-small" aria-hidden="true" />Logout</a></li>
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

