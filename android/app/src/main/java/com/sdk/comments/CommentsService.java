package com.sdk.comments;

import android.widget.Toast;

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
import com.viafourasdk.src.services.liveComments.LiveCommentsService;

public class CommentsService extends ReactContextBaseJavaModule {

    private LiveCommentsService liveCommentsService = ViafouraSDK.liveComments();

    public CommentsService(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CommentsService";
    }

    @ReactMethod
    public void commentCount(String containerId, Promise promise) {
        liveCommentsService.getCommentCount(containerId, new LiveCommentsService.CommentCountCallback() {
            @Override
            public void onSuccess(Integer commentCount) {
                promise.resolve(String.valueOf(commentCount));
            }

            @Override
            public void onError(NetworkError err) {
                promise.reject(err.message, err.message);
            }
        });
    }
}