import axios from 'axios';
import AuthService from '../auth/auth.service';

type RequestHeaderOptions = {
  headers?: any;
};

export class ApiService {
  options: RequestHeaderOptions = {};

  constructor(private authService: AuthService) {
    this.setOptions();
  }

  /**
   * @description Get the `id_token` from the AuthService,
   *              and set the HTTP header options with
   *              the Authorization token.
   *
   *              For production grade applications,
   *              all communications must happen within a
   *              secure communication (i.e. SSL)
   *
   *              We call setOptions() in all methods
   *              that requires Authentication.
   */
  setOptions = async () => {
    const idToken = await this.authService.getIdToken();
    if (idToken) {
      this.options.headers = {
        Authorization: idToken,
      };
    }
  };

  postRequest = async (endpoint: string, reqBody: any) => {
    this.setOptions();
    return axios.post(`${process.env.API_ROOT}${endpoint}`, reqBody, this.options);
  };
}
