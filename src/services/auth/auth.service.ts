import ApiService from '../api/api.service';

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
export const isLoggedIn = async () => {
  const idToken = localStorage.getItem('id_token');
  if (!idToken) return Promise.reject();
  const endpoint = '/api/tokensignin';
  const reqBody = { idToken };
  const apiService = new ApiService();
  try {
    const response = await apiService.postRequest(endpoint, reqBody, false);
    return await Promise.resolve(response);
  } catch (error) {
    return await Promise.reject(error);
  }
};

/**
 * @description User authentication service
 */
// export default class AuthService {
//   /**
//    * @description Whenever the user logs in, we store
//    *              their `user_id` token into the localStorage.
//    *              This token is provided by the OAuth service
//    *              when we authenticate successfully.
//    */
//   login = async () => {
//     const wGapi = window.gapi;
//     const googleAuth = await wGapi.auth2.getAuthInstance();
//     const googleUser = await googleAuth.signIn({ scope: 'profile email' });

//     localStorage.setItem('id_token', googleUser.getAuthResponse().id_token);
//   };

//   /**
//    * @description Whenever the user logs out, we delete
//    *              their `user_id` token into the localStorage.
//    */
//   logout = async () => {
//     const wGapi = window.gapi;
//     const googleAuth = wGapi.auth2.getAuthInstance();

//     try {
//       await googleAuth.signOut();
//       localStorage.removeItem('id_token');
//     } catch (error) {
//       // empty
//       console.log('ERROR logout', error);
//     }
//   };
// }
