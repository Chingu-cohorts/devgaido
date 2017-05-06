export function loginTestUser(user) {
  return {
    type: 'TEST_LOGIN',
    user,
  };
}
