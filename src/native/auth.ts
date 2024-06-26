var AuthService = require('react-native').NativeModules.AuthService;

export const doLogout = async () => {
  await AuthService.logout();
};

export const doLogin = async (email: string, password: string) => {
  await AuthService.login(email, password);
};

export const doSignup = async (
  name: string,
  email: string,
  password: string
) => {
  await AuthService.signup(name, email, password);
};

export const doSocialLogin = async (token: string) => {
  await AuthService.socialLogin(token);
};

export const doCookieLogin = async (token: string) => {
  await AuthService.cookieLogin(token);
};

export const doOpenIDLogin = async (token: string) => {
  await AuthService.openIdLogin(token);
};

export const doPasswordReset = async (email: string) => {
  await AuthService.resetPassword(email);
};
