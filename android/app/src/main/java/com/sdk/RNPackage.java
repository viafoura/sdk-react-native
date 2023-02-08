package com.sdk;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.sdk.auth.AuthService;
import com.sdk.previewComments.RNPreviewCommentsViewManager;

import java.util.Arrays;
import java.util.List;

public class RNPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.asList(
                new AuthService(reactContext)
        );
    }

    @NonNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactApplicationContext) {
        return Arrays.asList(
                new RNPreviewCommentsViewManager(reactApplicationContext)
        );
    }
}