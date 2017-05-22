const user = (state = {
  name: '',
  authenticated: false,
  email: '',
}, action) => {
  switch (action.type) {
    case 'TEST_LOGIN':
      return action.user;
    default:
      return state;
  }
};

export default user;
