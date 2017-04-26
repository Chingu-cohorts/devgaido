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

const Register = () => {
  // const { errors } = this.state;
  return (
    <div>
      <div>
        <label htmlFor="Email">Email</label>
        <input type="email" id="email" name="email" onChange={handleChange} />
        {errors.email ? errors.email : null}
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" onChange={handleChange} />
        {errors.username ? errors.username : null}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" onChange={handleChange} />
        {errors.password ? errors.password : null}
      </div>
      <div>
        <label htmlFor="password_confirmation">Password</label>
        <input id="password_confirmation" name="password_confirmation" type="password" onChange={handleChange} />
        {errors.password_confirmation ? errors.password_confirmation : null}
      </div>
      <div>
        <button type="button" onClick={handleSubmitClick} >Login</button>
      </div>
    </div>);
};

export default Register;
