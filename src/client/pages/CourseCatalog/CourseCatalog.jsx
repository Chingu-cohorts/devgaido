import React from 'react';
import LearningPath from './../shared/LearningPath';

const handleRegisterClick = () => {
  console.log('CLICKED ON REGISTER');
};

const CourseCatalog = () =>
	// const { errors } = this.state;
	(
		<div>

			<div className="side-panel side-panel-catalog is-visible">
				<h1>Course Catalog</h1>
			    <div className="panel-menu">
			     	
			    	<h2>Select topic</h2>
			    	<div className="catalog">
			    		<label><input type="checkbox" name="Javascript" value="Javascript" /><div className="checkmark"></div>Javascript</label>
			    		<label><input type="checkbox" name="HTML" value="HTML" /><div className="checkmark"></div>HTML</label>
			    		<label><input type="checkbox" name="CSS" value="CSS" /><div className="checkmark"></div>CSS</label>
			    		<label><input type="checkbox" name="SCC" value="Source Code Control" /><div className="checkmark"></div>Source Code Control</label>
			    		<label><input type="checkbox" name="CS" value="Computer Science" /><div className="checkmark"></div>Computer Science</label>
			    	</div>
					
					<h2>Select skill level</h2>
					<div className="catalog">
			    		<label><input type="checkbox" name="Prerequisite" value="Prerequisite" /><div className="checkmark"></div>Prerequisite</label>
			    		<label><input type="checkbox" name="Beginner" value="Beginner" /><div className="checkmark"></div>Beginner</label>
			    		<label><input type="checkbox" name="Intermediate" value="Intermediate" /><div className="checkmark"></div>Intermediate</label>
			    		<label><input type="checkbox" name="Advanced" value="Advanced" /><div className="checkmark"></div>Advanced</label>
			    	</div>
					<h2>Ready to Get Started?</h2>
					<button className="inline button-continue" type="button" onClick={handleRegisterClick} ><i></i>Sign Me Up!</button>
			    </div>
			  </div>

	  		<div className="content container-wide">

				<LearningPath />
			</div>
		</div>
		);

export default CourseCatalog;
