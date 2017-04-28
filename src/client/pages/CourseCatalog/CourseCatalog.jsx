import React from 'react';
import LearningPath from './../shared/LearningPath';

const handleRegisterClick = () => {
  console.log('CLICKED ON REGISTER');
};

const CourseCatalog = () =>
  // const { errors } = this.state;
   (
     <div>
       <h1>DevGaido Course Catalog</h1>
       <p>Feel free to browse through our course catalog to see what we have to offer.</p>
       <p>I&quote;m interested in seeing lessons about...</p>
       <div className="centeredContent">
         <button className="buttonPill" type="button" onClick={handleRegisterClick} >Javascript</button>
         <button className="buttonPill" type="button" onClick={handleRegisterClick} >HTML</button>
         <button className="buttonPill" type="button" onClick={handleRegisterClick} >CSS</button>
       </div>
       <LearningPath />
       <h2>Ready to Get Started?</h2>
       <div className="centeredContent">
         <button className="buttonPill" type="button" onClick={handleRegisterClick} >Sign Me Up!</button>
       </div>
     </div>);

export default CourseCatalog;
