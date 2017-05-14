import React from 'react';
import axios from 'axios';
import LearningPath from './../shared/LearningPath';

const handleRegisterClick = () => {
  console.log('CLICKED ON REGISTER');
};

class CourseCatalog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subjects: []
    };   
  }
  componentDidMount() {
    axios.get(`http://localhost:8080/subjects`)
      .then(res => {
        const subjects = res.data;
        console.log('subjects=',subjects);
        this.setState({subjects});
        console.log(this.state.subjects);
      });
  }
  render() {
    return (
      <div>
        <div className="side-panel side-panel-catalog is-visible">
          <h1>Course Catalog</h1>
          <div className="panel-menu">
            <h2>Select topic</h2>
            <div className="catalog">
            {this.state.subjects.map(subject => 
              <label htmlFor={subject}><input type="checkbox" name={subject} value={subject} /><div className="checkmark" />{subject}</label>
            )}
            </div>
            <h2>Select skill level</h2>
            <div className="catalog">
              <label htmlFor="Prerequisite"><input type="checkbox" name="Prerequisite" value="Prerequisite" /><div className="checkmark" />Prerequisite</label>
              <label htmlFor="Beginner"><input type="checkbox" name="Beginner" value="Beginner" /><div className="checkmark" />Beginner</label>
              <label htmlFor="Intermediate"><input type="checkbox" name="Intermediate" value="Intermediate" /><div className="checkmark" />Intermediate</label>
              <label htmlFor="Advanced"><input type="checkbox" name="Advanced" value="Advanced" /><div className="checkmark" />Advanced</label>
            </div>
            <h2>Ready to Get Started?</h2>
            <button className="inline button-continue" type="button" onClick={handleRegisterClick} ><i />Sign Me Up!</button>
          </div>
        </div>

        <div className="content container-wide">
          <LearningPath />
        </div>
      </div>
    );
  };
};

export default CourseCatalog;
