import React from 'react';

const handleShowMeClick = () => {
  console.log('CLICK BABY');
};

const Objectives = () => (
<div>                       
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
  <div className="content">
    <div className="form-container form-container-large">
      <div className="form form-wide">
        <div className="profile-picture target">
          <div>
          </div>
        </div>
        <div className="form-explanation">
          <h2>Learning objectives</h2>
          <p>What do you want to achieve?</p>
        </div>
        <form>
          <table className="objectives">
            <thead>
              <tr><th className="question"></th><th className="radio">Yes</th><th className="radio">No</th><th className="radio">Maybe</th><th>Self Assessed</th><th></th></tr>
            </thead>
            <tbody>
              <tr>
                <td className="question">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas?</td>
                <td className="radio"><input type="radio" name="E" value="Yes" checked /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="E" value="No" /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="E" value="Maybe" /><div className="check"></div></td>
                <td className="radio"><input type="checkbox" name="E" value="Maybe" /><div className="checkmark"></div></td>
                <td><a href="#">Assess</a></td>
              </tr>
              <tr>
                <td className="question">Lorem ipsum dolor sit amet, consectetur elit. Etiam porttitor sapien ullamcorper?</td>
                <td className="radio"><input type="radio" name="A" value="Yes" /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="A" value="No" /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="A" value="Maybe" checked /><div className="check"></div></td>
                <td className="radio"><input type="checkbox" name="A" value="Maybe" checked /><div className="checkmark"></div></td>
                <td><a href="#">Assess</a></td>
              </tr>
              <tr>
                <td className="question">Nam cursus a sapien vitae luctus. Pellentesque habitant morbi tristique?</td>
                <td className="radio"><input type="radio" name="B" value="Yes" /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="B" value="No" checked /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="B" value="Maybe" /><div className="check"></div></td>
                <td className="radio"><input type="checkbox" name="B" value="Maybe" /><div className="checkmark"></div></td>
                <td><a href="#">Assess</a></td>
              </tr>
              <tr>
                <td className="question">Donec in tristique arcu. Duis faucibus, leo ac dapibus consectetur,  ac ullamcorper metus?</td>
                <td className="radio"><input type="radio" name="C" value="Yes" checked /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="C" value="No" /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="C" value="Maybe" /><div className="check"></div></td>
                <td className="radio"><input type="checkbox" name="C" value="Maybe" /><div className="checkmark"></div></td>
                <td><a href="#">Assess</a></td>
              </tr>
              <tr>
                <td className="question">Curabitur quam neque, suscipit quis congue a, vulputate in nunc. Curabitur leo pretium ?</td>
                <td className="radio"><input type="radio" name="D" value="Yes" checked /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="D" value="No" /><div className="check"></div></td>
                <td className="radio"><input type="radio" name="D" value="Maybe" /><div className="check"></div></td>
                <td className="radio"><input type="checkbox" name="D" value="Maybe" checked /><div className="checkmark"></div></td>
                <td><a href="#">Assess</a></td>
              </tr>
            </tbody>
          </table>

          
          <div className="form-action">
            <button className="inline button-continue"><i></i>&nbsp;&nbsp;Create My Learning Path</button>
            <span className="form-links"><a href="#">Cancel</a></span>
          </div>
        </form>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-bar-element completed"><i className="fa fa-check" aria-hidden="true"></i><span>User information</span></div>
          <div className="progress-bar-element completed"><i className="fa fa-check" aria-hidden="true"></i><span>Learning times</span></div>
          <div className="progress-bar-element completed"><i className="fa fa-check" aria-hidden="true"></i><span>Learning objectives</span></div>
          <div className="progress-bar-element"><span>Self assessment</span></div>
        </div>
      </div>
    </div>
  </div>
</div>
);

export default Objectives;
