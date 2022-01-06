export const isLoggedIn = () => {
  const idToken = localStorage.getItem('id_token');
  return new Promise((resolve, reject) => {
    if (!idToken) return reject();
    const endpoint = `${process.env.API_ROOT}/api/tokensignin`;
    const reqBody = { idToken };
  });
};

/**
 * @description User authentication service
 */
export default class AuthService {
  constructor() {
    const wGapi = window.gapi;
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    wGapi.load('auth2', async () => {
      await wGapi?.auth2?.init({
        client_id: googleClientId,
      });
    });
  }

  /**
   * @description Return the token from the localStorage
   */
  getIdToken = (): string | null => {
    return localStorage.getItem('id_token');
  };

  /**
   * @description Simply calls our rest api to
   *              check if our `id_token` is valid.
   *
   *              The rest api will verify this `id_token`
   *              with the OAuth service and ket us know the result.
   *
   *              For this purpose, we created a new
   *              route (/api/tokensignin) within the rest api.
   *
   *              Whenever a user tries to perform any task
   *              (e.g. CRUD) we simply pass this `id_token`
   *              in the HTTP Headers so our rest api can access it.
   *
   *              The rest api will then send this `id_token` to
   *              AWS Cognito to get temporary AWS credentials,
   *              and use these to perform HTTP Request operations.
   */
  isLoggedIn = () => {
    // empty
  };

  /**
   * @description Whenever the user logs in, we store
   *              their `user_id` token into the localStorage.
   *              This token is provided by the OAuth service
   *              when we authenticate successfully.
   */
  login = async () => {
    const wGapi = window.gapi;
    const googleAuth = await wGapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn({ scope: 'profile email' });

    localStorage.setItem('id_token', googleUser.getAuthResponse().id_token);
  };

  /**
   * @description Whenever the user logs out, we delete
   *              their `user_id` token into the localStorage.
   */
  logout = async () => {
    const wGapi = window.gapi;
    const googleAuth = wGapi.auth2.getAuthInstance();

    try {
      await googleAuth.signOut();
      localStorage.removeItem('id_token');
    } catch (error) {
      // empty
      console.log('ERROR logout', error);
    }
  };
}
