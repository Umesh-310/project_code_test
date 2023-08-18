import cookie from "react-cookies";

export const saveCookies = (name, token) => {
  cookie.save(name, token, { path: "/" });
};

export const loadCookies = (name) => {
  let token = cookie.load(name);
  return token;
};

export const removeCookies = (name) => {
  cookie.remove(name, { path: "/" });
};
