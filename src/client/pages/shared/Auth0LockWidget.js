import Auth0Lock from 'auth0-lock';

const Auth0LockWidget = (auth0) => {
  const lock = ({ domain, clientID, callbackURL }) => ((typeof window !== 'undefined') ? new Auth0Lock(clientID, domain, {
    auth: {
      redirectUrl: callbackURL,
      responseType: 'code',
      params: {
        scope: 'openid name email picture',
      },
    },
    theme: {
      logo: '/assets/img/profile2.svg',
      primaryColor: 'green',
    },
    languageDictionary: {
      title: 'devGaido',
    },
  }) : null);

  return lock(auth0);
};

export default Auth0LockWidget;
