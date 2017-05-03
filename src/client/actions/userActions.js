export default function loginTestUser(user) {
  return {
    type: 'TEST_LOGIN',
    user,
  };
}
