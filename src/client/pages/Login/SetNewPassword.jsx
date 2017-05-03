import React from 'react';
import { NavLink } from 'react-router-dom';

const handleChange = () => {
  console.log('CHANGE BABY');
};

class SetNewPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      passwordSet: false,
    };
  }
  handleSubmitClick() {
    this.state = {
      passwordSet: true,
    };
    this.forceUpdate();
  }
  render() {
    const confirmationScreen = (<div className="centeredContent">
      <h1>Your new password has been set.</h1>
      <NavLink to="/login" className="buttonPill">Go To Login</NavLink>
    </div>);
    const changePasswordScreen = (<div>
      <h1>Set New Password</h1>
      <p>
        Enter your new password:
      </p>
      <div className="inputWrapper">
        <label htmlFor="password">New password</label>
        <input id="password" name="password" type="password" onChange={handleChange} />
      </div>
      <div className="inputWrapper">
        <label htmlFor="passwordRepeat">Repeat your new password</label>
        <input id="passwordRepeat" name="passwordRepeat" type="password" onChange={handleChange} />
      </div>
      <div className="centeredContent">
        <button className="buttonPill" type="button" onClick={() => this.handleSubmitClick()} >Set New Password</button>
      </div>
    </div>);
    return (this.state.passwordSet ? confirmationScreen : changePasswordScreen);
  }
}

export default SetNewPassword;
