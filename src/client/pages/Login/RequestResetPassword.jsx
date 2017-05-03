import React from 'react';

const handleChange = () => {
  console.log('CHANGE BABY');
};

class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
      showMessage: false,
    };
  }
  handleSubmitClick() {
    this.state = {
      showMessage: true,
    };
    this.forceUpdate();
  }
  render() {
    const message = this.state.showMessage ?
      <h1>You were sent an email with instructions to reset your password.</h1> : null;
    return (
      <div>
        {message}
        <h1>Request Password Reset</h1>
        <p>
          Enter your email adress and we will send you and email
          with instructions to reset your password:
        </p>
        <div className="inputWrapper">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="text" onChange={handleChange} />
        </div>
        <div className="centeredContent">
          <button className="buttonPill" type="button" onClick={() => this.handleSubmitClick()} >Reset Password</button>
        </div>
        <a href="/setnewpassword">Link to New Password Page</a>
      </div>);
  }
}

export default ResetPassword;
