package com.sdk.auth;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.viafourasdk.src.ViafouraSDK;
import com.viafourasdk.src.model.network.authentication.cookieLogin.CookieLoginResponse;
import com.viafourasdk.src.model.network.authentication.login.LoginResponse;
import com.viafourasdk.src.model.network.authentication.openId.OpenIdLoginResponse;
import com.viafourasdk.src.model.network.authentication.signup.SignUpResponse;
import com.viafourasdk.src.model.network.authentication.socialLogin.SocialLoginResponse;
import com.viafourasdk.src.model.network.error.NetworkError;
import com.viafourasdk.src.services.auth.VFAuthService;

public class AuthService extends ReactContextBaseJavaModule {

    private VFAuthService authService = ViafouraSDK.auth();

    public AuthService(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "AuthService";
    }

    @ReactMethod
    public void signup(String name, String email, String password, Promise promise) {
        authService.signup(name, email, password, new VFAuthService.SignUpCallback() {
            @Override
            public void onSuccess(SignUpResponse loginResponse) {
                promise.resolve("");
            }

            @Override
            public void onError(NetworkError err) {
                promise.reject(err.message, err.message);
            }
        });
    }

    @ReactMethod
    public void login(String email, String password, Promise promise) {
        authService.login(email, password, new VFAuthService.LoginCallback() {
            @Override
            public void onSuccess(LoginResponse loginResponse) {
                promise.resolve("Success");
            }

            @Override
            public void onError(NetworkError err) {
                promise.reject("", "");
            }
        });
    }

    @ReactMethod
    public void openIdLogin(String token, Promise promise) {
        authService.openIdLogin(token, new VFAuthService.OpenIdLoginCallback() {
            @Override
            public void onSuccess(OpenIdLoginResponse loginResponse) {
                promise.resolve("");
            }

            @Override
            public void onError(NetworkError err) {
                promise.reject("", "");
            }
        });
    }

    @ReactMethod
    public void cookieLogin(String token, Promise promise) {
        authService.cookieLogin(token, new VFAuthService.CookieLoginCallback() {
            @Override
            public void onSuccess(CookieLoginResponse loginResponse) {
                promise.resolve("");
            }

            @Override
            public void onError(NetworkError err) {
                promise.reject("", "");
            }
        });
    }

    @ReactMethod
    public void socialLogin(String token, Promise promise) {
        authService.socialLogin(token, new VFAuthService.SocialLoginCallback() {
            @Override
            public void onSuccess(SocialLoginResponse loginResponse) {
                promise.resolve("");
            }

            @Override
            public void onError(NetworkError err) {
                promise.reject(err.message, "");
            }
        });
    }

    @ReactMethod
    public void resetPassword(String email, Promise promise) {
        authService.passwordReset(email, new VFAuthService.PasswordResetCallback() {
            @Override
            public void onSuccess() {
                promise.resolve("");
            }

            @Override
            public void onError(NetworkError err) {
                promise.reject(err.message, "");
            }
        });
    }

    @ReactMethod
    public void logout(Promise promise) {
        authService.logout();
        promise.resolve("");
    }
}