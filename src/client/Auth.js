import auth0js from 'auth0-js';

export default class Auth {
  constructor(auth0) {
    this.auth0 = new auth0js.WebAuth({
      domain: auth0.domain,
      clientID: auth0.clientID,
      redirectUri: auth0.callbackURL,
      responseType: 'code',
      scope: 'openid name email picture',
    });
  }

  login() {
    console.log('Login!')
    this.auth0.popup.authorize({
      redirectURI: 'http://localhost:8080/callback',
    }, (err, data) => {
      console.log('Am I ever called? T_T')
      console.log('CALLBACK???', data, err);
    });
    console.log('After Login!')
    // this.auth0.authorize();
  }
}
