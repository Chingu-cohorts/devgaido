import React from 'react';
import PropTypes from 'prop-types';

import PageHero from '../shared/PageHero';
import PageDivider from '../shared/PageDivider';

const Profile = ({ user }) => (
  <div>
    <PageHero bgColorClass="bg-primary" bgImageClass="bg-img__path" title="Profile" />
    <PageDivider />
    <div className="container margin-top-big">
      <div className="form-container">
        {/* <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-bar-element completed">
              <i className="fa fa-check" aria-hidden="true" />
              <span>User information</span>
            </div>
            <div className="progress-bar-element"><span>Learning times</span></div>
            <div className="progress-bar-element"><span>Learning objectives</span></div>
            <div className="progress-bar-element"><span>Self assessment</span></div>
          </div>
        </div>*/}
        <div className="form">
          <div className="profile-picture">
            <div>
              {/* <a href="/" className="edit-image">
                <i className="fa fa-plus" aria-hidden="true" />
                </a>*/}
            </div>
          </div>
          <div className="form-explanation">
            <h2>Basic user information</h2>
            <p>Please fill out your profile details</p>
          </div>
          <form>
            <label className="username" htmlFor="username">
              <input type="text" name="username" placeholder="User name" defaultValue={user.name} />
            </label>
            <label className="email" htmlFor="email">
              <input type="email" name="email" placeholder="Email" defaultValue={user.email} />
            </label>
            {/* <label className="country" htmlFor="country">
              <input type="text" name="country" placeholder="Select country" />
            </label>
            <label className="city" htmlFor="city">
              <input type="text" name="city" placeholder="City" />
            </label>
            <div className="form-action">
              <button className="inline button-continue">
                <i />&nbsp;&nbsp;Save &amp; continue</button>
              <span className="form-links"><a href="/">Cancel</a></span>
            </div>*/}
          </form>
        </div>
      </div>
    </div>
  </div>
);

Profile.propTypes = {
  user: PropTypes.objectOf(PropTypes.shape),
};

Profile.defaultProps = {
  user: null,
};

export default Profile;
