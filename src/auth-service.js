import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import AppConstants from "./app-constants";
import Api from "./api";

const loginSubject = new BehaviorSubject(
  !!localStorage.getItem(AppConstants.AUTH_TOKEN_KEY)
);

const AuthService = {
  config: { baseUrl: null },
  get isAuthenticated() {
    return loginSubject.value;
  },

  register(data) {
    return Api.post(`${this.config.baseUrl || "auth"}/register`, data);
  },

  login(data) {
    return Api.post(`${this.config.baseUrl || "auth"}/login`, data).pipe(
      map(response => {
        this.setToken(response.data.data.token);
        this.setUser(response.data.data.data);
        loginSubject.next(true);
      })
    );
  },

  fetchConfig() {
    return Api.get("/config").pipe(map(response => response["data"]));
  },

  sendOtp(data) {
    return Api.post(`${this.config.baseUrl || "auth"}/send-otp`, data).pipe(
      map(response => response["data"])
    );
  },

  resetPassword(data) {
    return Api.post(
      `${this.config.baseUrl || "auth"}/reset-password`,
      data
    ).pipe(map(response => response["data"]));
  },

  validateToken() {
    return Api.post(`${this.config.baseUrl || "auth"}/validate-token`).pipe(
      map(response => {
        this.setUser(response.data.data);
      })
    );
  },

  logout() {
    return Api.post(`${this.config.baseUrl || "auth"}/logout`).pipe(
      map(resp => {
        localStorage.clear();
        loginSubject.next(false);
        return resp;
      })
    );
  },

  clearLocalStorage() {
    localStorage.clear();
    loginSubject.next(false);
  },

  setUser(user) {
    localStorage.setItem(AppConstants.USER_KEY, JSON.stringify(user));
  },

  getUser() {
    return JSON.parse(localStorage.getItem(AppConstants.USER_KEY));
  },

  setConfig(data) {
    localStorage.setItem(AppConstants.CONFIG_KEY, JSON.stringify(data));
  },

  getConfig() {
    return JSON.parse(localStorage.getItem(AppConstants.CONFIG_KEY));
  },

  setToken(token) {
    localStorage.setItem(AppConstants.AUTH_TOKEN_KEY, token);
  },

  getToken() {
    return localStorage.getItem(AppConstants.AUTH_TOKEN_KEY);
  },

  hasToken() {
    return !!localStorage.getItem(AppConstants.AUTH_TOKEN_KEY);
  }
};

export default AuthService;
