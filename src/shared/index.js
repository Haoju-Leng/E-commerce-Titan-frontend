/* Copyright G. Hemingway, @2022 - All rights reserved */
"use strict";

export const validPassword = (password) => {
  if (!password || password.length < 8) {
    return { error: "Password length must be > 7" };
  } else if (!password.match(/[0-9]/i)) {
    return { error: "Password must contain a number" };
  } else if (!password.match(/[a-z]/)) {
    return { error: "Password must contain a lowercase letter" };
  } else if (!password.match(/\@|\!|\#|\$|\%|\^/i)) {
    return { error: "Password must contain @, !, #, $, % or ^" };
  } else if (!password.match(/[A-Z]/)) {
    return { error: "Password must contain an uppercase letter" };
  }
  return undefined;
};

export const validEmail = (username) => {
  if (!username.match(/^[a-z0-9](\.?[a-z0-9]){5,}@vanderbilt\.edu$/)) {
    return { error: "Email must be a vandy email" };
  }
  return undefined;
};
