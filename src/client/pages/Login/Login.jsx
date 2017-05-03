import React from 'react';
import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { loginTestUser } from '../../actions/userActions';

const errors = {
  email: 'No email entered',
  password: 'No password entered',
};

const handleChange = () => {
  console.log('CHANGE BABY');
};

const handleSubmitClick = (dispatch) => {
  dispatch(loginTestUser({
    name: 'TESTUSER',
    authenticated: true,
  }));
  // TODO: ADD A MEANS OF REDIRECTING TO THE DASHBOARD
};

const Login = props =>
  (
    <div>
      <div className="inputWrapper">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" onChange={handleChange} />
        {errors.email ? errors.email : null}
      </div>
      <div className="inputWrapper">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={handleChange} />
        {errors.password ? errors.password : null}
      </div>
      <div className="centeredContent">
        <button className="buttonPill" type="button" onClick={() => handleSubmitClick(props.dispatch)} >Login</button>
        <NavLink to="/requestresetpassword" className="buttonPill">I forgot my password</NavLink>
        <a href="/auth/github" className="buttonPill">Sign in with Github</a>
      </div>
    </div>);

// TODO: Have only container component have access to store and maybe pass down as props?
const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(Login);
