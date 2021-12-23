/**
 * @description User authentication service
 */
export class AuthService {
    constructor() {

    }

    /**
     * @description Return the token from the localStorage
     */
    getIdToken = () => {}

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
    isLoggedIn = () => {}

    /**
     * @description Whenever the user logs in, we store 
     *              their `user_id` token into the localStorage.
     *              This token is provided by the OAuth service
     *              when we authenticate successfully.
     */
    login = () => {}

    /**
     * @description Whenever the user logs out, we delete 
     *              their `user_id` token into the localStorage.
     */
    logout = () => {}
}