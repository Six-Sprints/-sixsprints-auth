import React, { useState } from "react";
import { createContainer } from "unstated-next";
import AuthService from "./auth-service";

function useAuth() {
  const setBaseUrl = url => {
    AuthService.config.baseUrl = url;
  };
  const login = (data, successCb, errorCb) => {
    AuthService.login(data).subscribe(
      resp => {
        successCb();
      },
      error => {
        errorCb(error);
      }
    );
  };

  const register = data => {
    AuthService.register(data).subscribe(resp => {
      console.log("REGISTER");
    });
  };

  return { login, register, setBaseUrl };
}

const Auth = createContainer(useAuth);
export default Auth;
