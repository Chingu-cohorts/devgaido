import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import PageHero from '../shared/PageHero';
import PageDivider from '../shared/PageDivider';
import AnimateVisibleChildrenDiv from '../shared/AnimateVisibleChildrenDiv';

const Profile = ({ user }) => (
  <div>
    <Helmet title="Profile" />
    <PageHero bgColorClass="bg-primary" bgUrl="/img/path.jpg" title="Profile" />
    <PageDivider />
    <AnimateVisibleChildrenDiv className="container margin-top-huge margin-bottom-huge">
      <div>
        <h1 className="h2-d1 h3-t width-100 wider">Basic user information</h1>
        <p className="h4 h5-d1">Please fill out your profile details</p>
        <form>
          <label htmlFor="username">
            <input type="text" name="username" placeholder="User name" defaultValue={user.name} />
          </label>
          <label htmlFor="email">
            <input type="email" name="email" placeholder="Email" defaultValue={user.email} />
          </label>
        </form>
      </div>
    </AnimateVisibleChildrenDiv>
  </div>
);

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
}))(Profile);
