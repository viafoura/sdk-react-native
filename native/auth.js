var AuthService = require('react-native').NativeModules.AuthService;

export const doLogout = async () => {
  await AuthService.logout()
};

export const doLogin = async (email, password) => {
  await AuthService.login(email, password)
};

export const doSignup = async (name, email, password) => {
  await AuthService.signup(name, email, password)
};

export const doSocialLogin = async (token) => {
  await AuthService.socialLogin(token)
};

export const doCookieLogin = async (token, type) => {
  await AuthService.cookieLogin(token, type)
};

export const doOpenIDLogin = async (token) => {
  await AuthService.openIdLogin(token)
};
