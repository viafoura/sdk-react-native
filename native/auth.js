var AuthService = require('react-native').NativeModules.AuthService;

export const doLogout = async () => {
    try {
      await AuthService.logout()
    } catch (err) {
      alert(err)
    }
};

export const doLogin = async (email, password) => {
    try {
      await AuthService.login(email, password)
    } catch (err) {
      alert(err)
    }
};

export const doSignup = async (name, email, password) => {
    try {
      await AuthService.signup(name, email, password)
    } catch (err) {
      alert(err)
    }
};

export const doSocialLogin = async (token) => {
    try {
      await AuthService.socialLogin(token)
    } catch (err) {
      alert(err)
    }
};

export const doCookieLogin = async (token, type) => {
    try {
      await AuthService.cookieLogin(token, type)
    } catch (err) {
      alert(err)
    }
};

export const doOpenIDLogin = async (token) => {
    try {
      await AuthService.openIdLogin(token)
    } catch (err) {
      alert(err)
    }
};
