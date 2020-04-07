const Form = {
  login: {
    styles: {
      formClassName: "column m-2",
      fieldClassName: "form-control"
    },
    fields: [
      {
        key: "mobileNumber",
        placeholder: "Mobile Number",
        type: "tel"
      },
      {
        key: "password",
        placeholder: "Password",
        type: "password"
      },
      {
        key: "button",
        text: "Submit",
        type: "submit"
      }
    ]
  }
};

export default Form;
