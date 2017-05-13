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
        console.log(res.data);
        const subjects = res.data;
        console.log(subjects);
        this.setState({ subjects });
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
            <label htmlFor="Javascript"><input type="checkbox" name="Javascript" value="Javascript" /><div className="checkmark" />Javascript</label>
            <label htmlFor="HTML"><input type="checkbox" name="HTML" value="HTML" /><div className="checkmark" />HTML</label>
            <label htmlFor="CSS"><input type="checkbox" name="CSS" value="CSS" /><div className="checkmark" />CSS</label>
            <label htmlFor="SCC"><input type="checkbox" name="SCC" value="Source Code Control" /><div className="checkmark" />Source Code Control</label>
            <label htmlFor="CS"><input type="checkbox" name="CS" value="Computer Science" /><div className="checkmark" />Computer Science</label>
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
