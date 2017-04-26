import React from 'react';

const errors = {
  email: 'NO EMAIL, RETARD!',
  password: 'WTH, DO YOU KNOW WHAT A PASSWORD IS?',
};

const handleChange = () => {
  console.log('CHANGE BABY');
};

const handleSubmitClick = () => {
  console.log('CLICK BABY');
};

const Login = () => {
  // const { errors } = this.state;
  return (
    <div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="text" onChange={handleChange} />
        {errors.email ? errors.email : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={handleChange} />
        {errors.password ? errors.password : null}
      </div>
      <div>
        <button type="button" onClick={handleSubmitClick} >Login</button>
      </div>
    </div>);
};

export default Login;
