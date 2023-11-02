"use strict";
const uf = new UserForm();

uf.loginFormCallback = (data) => {
  ApiConnector.login(data, (answer) => {
    if (answer.success) {
      location.reload();
    } else {
      uf.setLoginErrorMessage(answer.error);
    }
  });
};

uf.registerFormCallback = (data) => {
  ApiConnector.register(data, (answer) => {
    if (answer.success) {
      location.reload();
    } else {
      uf.setRegisterErrorMessage(answer.error);
    }
  });
};
