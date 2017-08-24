import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import PageHero from '../shared/PageHero';
import PageDivider from '../shared/PageDivider';

const Profile = ({ user }) => (
  <div>
    <Helmet title="Profile" />
    <PageHero bgColorClass="bg-primary" bgUrl="/img/path.jpg" title="Profile" />
    <PageDivider />
    <div className="container margin-top-huge margin-bottom-huge">
      <h1>Basic user information</h1>
      <p>Please fill out your profile details</p>
      <form>
        <label className="" htmlFor="username">
          <input type="text" name="username" placeholder="User name" defaultValue={user.name} />
        </label>
        <label className="" htmlFor="email">
          <input type="email" name="email" placeholder="Email" defaultValue={user.email} />
        </label>
      </form>
    </div>
  </div>
);

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape).isRequired,
};

export default connect(store => ({
  user: store.user,
}))(Profile);
