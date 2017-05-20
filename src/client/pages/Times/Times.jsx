import React from 'react';

const handleShowMeClick = () => {
  console.log('CLICK BABY');
};

const Times = () => (
<div>                       
  <div className="content">
    <div className="form-container form-container-large">
      <div className="notation-toggle">
        <span>24h</span>
        <label className="switch">
          <input type="checkbox" defaultChecked/>
          <div className="switch-slider"></div>
        </label>
        <span>12h</span>
      </div>
      <div className="form form-wide">
        <div className="schedule">
          <div>
          </div>
        </div>
        <div className="form-explanation">
          <h2>Learning times</h2>
          <p>Use the sliders to indicate the time ranges available to study. <br />Click on the add icon to add additional ranges.</p>
        </div>
        <form>
          <table className="schedule">
            <tbody>
              <tr>
                <td><h2>Monday</h2></td>
                <td className="slider"><div className="slr-mon"></div></td>
                <td className="range">
                  <div id="time-range">
                      <p><span className="slt-mon-A">9:00 AM</span> - <span className="slt-mon-B">5:00 PM</span></p>
                  </div>
                </td>
                <td><a href="#" className="add"><i className="fa fa-plus" aria-hidden="true"></i></a></td>
              </tr>
              <tr>
                <td><h2>Tuesday</h2></td>
                <td className="slider"><div className="slr-tue"></div></td>
                <td className="range">
                  <div id="time-range">
                      <p><span className="slt-tue-A">9:00 AM</span> - <span className="slt-tue-B">5:00 PM</span></p>
                  </div>
                </td>
                <td><a href="#" className="add"><i className="fa fa-plus" aria-hidden="true"></i></a></td>
              </tr>
              <tr className="additional">
                <td></td>
                <td className="slider"><div className="slr-tue-2"></div></td>
                <td className="range">
                  <div id="time-range">
                      <p><span className="slt-tue-A-2">9:00 AM</span> - <span className="slt-tue-B-2">5:00 PM</span></p>
                  </div>
                </td>
                <td><a href="#" className="remove"><i className="fa fa-times" aria-hidden="true"></i></a></td>
              </tr>
              <tr>
                <td><h2>Wednesday</h2></td>
                <td className="slider"><div className="slr-wed"></div></td>
                <td className="range">
                  <div id="time-range">
                      <p><span className="slt-wed-A">9:00 AM</span> - <span className="slt-wed-B">5:00 PM</span></p>
                  </div>
                </td>
                <td><a href="#" className="add"><i className="fa fa-plus" aria-hidden="true"></i></a></td>
              </tr>
              <tr>
                <td><h2>Thursday</h2></td>
                <td className="slider"><div className="slr-thu"></div></td>
                <td className="range">
                  <div id="time-range">
                      <p><span className="slt-thu-A">9:00 AM</span> - <span className="slt-thu-B">5:00 PM</span></p>
                  </div>
                </td>
                <td><a href="#" className="add"><i className="fa fa-plus" aria-hidden="true"></i></a></td>
              </tr>
              <tr>
                <td><h2>Friday</h2></td>
                <td className="slider"><div className="slr-fri"></div></td>
                <td className="range">
                  <div id="time-range">
                      <p><span className="slt-fri-A">9:00 AM</span> - <span className="slt-fri-B">5:00 PM</span></p>
                  </div>
                </td>
                <td><a href="#" className="add"><i className="fa fa-plus" aria-hidden="true"></i></a></td>
              </tr>
              <tr>
                <td><h2>Saturday</h2></td>
                <td className="slider"><div className="slr-sat"></div></td>
                <td className="range">
                  <div id="time-range">
                      <p><span className="slt-sat-A">9:00 AM</span> - <span className="slt-sat-B">5:00 PM</span></p>
                  </div>
                </td>
                <td><a href="#" className="add"><i className="fa fa-plus" aria-hidden="true"></i></a></td>
              </tr>
              <tr>
                <td><h2>Sunday</h2></td>
                <td className="slider"><div className="slr-sun"></div></td>
                <td className="range">
                  <div id="time-range">
                      <p><span className="slt-sun-A">9:00 AM</span> - <span className="slt-sun-B">5:00 PM</span></p>
                  </div>
                </td>
                <td><a href="#" className="add"><i className="fa fa-plus" aria-hidden="true"></i></a></td>
              </tr>
            </tbody>
          </table>
          
          <div className="form-action">
            <button className="inline button-continue"><i></i>&nbsp;&nbsp;Save &amp; continue</button>
            <span className="form-links"><a href="#">Cancel</a></span>
          </div>
        </form>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-bar-element completed"><i className="fa fa-check" aria-hidden="true"></i><span>User information</span></div>
          <div className="progress-bar-element completed"><i className="fa fa-check" aria-hidden="true"></i><span>Learning times</span></div>
          <div className="progress-bar-element"><span>Learning objectives</span></div>
          <div className="progress-bar-element"><span>Self assessment</span></div>
        </div>
      </div>
    </div>
  </div>
</div>
);

export default Times;
