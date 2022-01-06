import axios from 'axios';

type RequestHeaderOptions = {
  headers?: {
    Authorization?: string;
  };
};

class ApiService {
  private options: RequestHeaderOptions = {};

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
    const idToken = localStorage.getItem('id_token');
    if (idToken) {
      this.options.headers = {
        Authorization: idToken,
      };
    }
  };

  postRequest = async (endpoint: string, reqBody: any, withOptions = true) => {
    if (withOptions) this.setOptions();
    return axios.post(`${process.env.API_ROOT}${endpoint}`, reqBody, this.options);
  };
}

export default ApiService;
