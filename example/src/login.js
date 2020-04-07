import React from "react";
import RJForm from "rj-form";
import Form from "./form";
import { Auth } from "@sixsprint/auth";
import { NotificationManager } from "react-notifications";
import { useHistory } from "react-router-dom";

const Login = () => {
  const auth = Auth.useContainer();
  let history = useHistory();

  auth.setBaseUrl("auth/doctor");

  const handleSubmit = val => {
    auth.login(
      val,
      () => {
        history.replace("/home");
      },
      SHOW_ERROR_NOTIFICATION
    );
  };

  return (
    <div>
      <RJForm handleSubmit={handleSubmit} formData={Form.login} />
    </div>
  );
};

export default Login;

export const SHOW_ERROR_NOTIFICATION = error => {
  NotificationManager.error(error, "", 8000);
};
