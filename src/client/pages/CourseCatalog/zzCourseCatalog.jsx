import React from 'react';
import LearningPath from './../shared/LearningPath';

const handleRegisterClick = () => {
  console.log('CLICKED ON REGISTER');
};

const CourseCatalog = () =>
	// const { errors } = this.state;
	(
		<div>
			<div className="sub-header">
				<div className="container">
					<h1>Course Catalog</h1>
					<select>
						<option value="Javascript" onClick={handleRegisterClick} >Javascript</option>
						<option value="HTML" onClick={handleRegisterClick} >HTML</option>
						<option value="CSS" onClick={handleRegisterClick} >CSS</option>
					</select>
					<select>
						<option value="Beginner" onClick={handleRegisterClick} >Beginner</option>
						<option value="Intermediate" onClick={handleRegisterClick} >Intermediate</option>
						<option value="Advanced" onClick={handleRegisterClick} >Advanced</option>
					</select>
				</div>
			</div>

			<div className="side-panel is-visible">
			    <div className="panel-links">
			      <a className="side-panel-close" href="#">Close</a>
			    </div>
			    <div className="panel-menu">
			      <h1>Welcome back Erik!</h1>
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

	  		<div className="content container">

				<LearningPath />
				<h2>Ready to Get Started?</h2>
				<div className="centeredContent">
				<button className="button" type="button" onClick={handleRegisterClick} >Sign Me Up!</button>
				</div>
			</div>
		</div>
		);

export default CourseCatalog;
