const user = (state = {
  name: '',
  authenticated: false,
}, action) => {
  switch (action.type) {
    case 'TEST_LOGIN':
      return action.user;
    default:
      return state;
  }
};

export default user;
