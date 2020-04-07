import Axios from "axios-observable";
import AppConstants from "./app-constants";
import AuthService from "./auth-service";

const Api = Axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

Api.interceptors.request.use(function (config) {
  const token = AuthService.getToken();
  if (token) {
    config.headers.common[AppConstants.AUTH_TOKEN_KEY] = token;
  }
  return config;
});

export default Api;
