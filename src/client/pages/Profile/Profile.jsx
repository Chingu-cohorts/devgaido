import React from 'react';

const handleShowMeClick = () => {
  console.log('CLICK BABY');
};

const Profile = () => (
<div>                       
  <div className="side-panel">
    <div className="panel-links">
      <a className="side-panel-close" href="#">Close</a>
    </div>
    <div className="panel-menu">
      <h1>Welcome back Erik!</h1>
      <a>test link</a>
      <h2>Your learning path</h2>
      <ul>
        <li className="times"><i className="fa fa-calendar" aria-hidden="true"></i>Schedule</li>
        <li className="times"><i className="fa fa-graduation-cap" aria-hidden="true"></i>Lessons</li>
        <li><i className="fa fa-book" aria-hidden="true"></i>Resources</li>
      </ul>
      <h2>Your Settings</h2>
      <ul>
        <li className="information"><i className="fa fa-user-o" aria-hidden="true"></i>Your profile</li>
        <li><i className="fa fa-cog" aria-hidden="true"></i>Preferences</li>
        <li><i className="fa fa-flag" aria-hidden="true"></i>Notifications</li>
      </ul>
    </div>
  </div>
  
  <div className="content">
    <div className="form-container">
      <div className="form">
        <div className="profile-picture">
          <div>
            <a href="#" className="edit-image"><i className="fa fa-plus" aria-hidden="true"></i></a>
          </div>
        </div>
        <div className="form-explanation">
          <h2>Basic user information</h2>
          <h3 className="original" href="google.com">test link</h3>
          <h3 className="origDark" href="google.com">test link</h3>
          <h3 className="newDark" href="google.com">test link</h3>
        <p>Please fill out your profile details</p>
        </div>
        <form>
          <label className="username">
            <input type="text" name="username" placeholder="User name"/>
          </label>
          <label className="password">
            <input type="password" name="password" placeholder="Password"/>
            <span className="form-icon-links"><a href="#"><i className="fa fa-eye" aria-hidden="true"></i></a>&nbsp;&nbsp;<a href="#"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></a></span>
          </label>
          <label className="email">
            <input type="email" name="email" placeholder="Email"/>
          </label>
          <label className="country">
            <input type="text" name="country" placeholder="Select country"/>
          </label>
          <label className="city">
            <input type="text" name="city" placeholder="City"/>
          </label>
          <div className="form-action">
            <button className="inline button-continue"><i></i>&nbsp;&nbsp;Save &amp; continue</button>
            <span className="form-links"><a href="#">Cancel</a></span>
          </div>
        </form>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-bar-element completed"><i className="fa fa-check" aria-hidden="true"></i><span>User information</span></div>
          <div className="progress-bar-element"><span>Learning times</span></div>
          <div className="progress-bar-element"><span>Learning objectives</span></div>
          <div className="progress-bar-element"><span>Self assessment</span></div>
        </div>
      </div>
    </div>
  </div>
</div>
);

export default Profile;
