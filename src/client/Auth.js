import auth0js from 'auth0-js';

export default class Auth {
  constructor(auth0) {
    console.log(auth0)
    this.auth0 = new auth0js.WebAuth({
      domain: auth0.domain,
      clientID: auth0.clientID,
      redirectUri: auth0.callbackURL,
      responseType: 'code',
      scope: 'openid name email picture',
    });
  }

  login() {
    this.auth0.authorize();
  }
}
