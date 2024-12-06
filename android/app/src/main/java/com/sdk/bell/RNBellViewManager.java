package com.sdk.bell;

import android.content.res.Resources;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.viafourasdk.src.model.local.VFColors;
import com.viafourasdk.src.model.local.VFDefaultColors;
import com.viafourasdk.src.model.local.VFSettings;
import com.viafourasdk.src.model.local.VFTheme;
import com.viafourasdk.src.view.notificationBell.VFNotificationBellView;

public class RNBellViewManager extends SimpleViewManager<VFNotificationBellView> {

    public static final String REACT_CLASS = "RNBellAndroid";
    ReactApplicationContext mCallerContext;
    private int propHeight;

    public RNBellViewManager(ReactApplicationContext reactContext) {
        mCallerContext = reactContext;
    }

    @ReactPropGroup(names = {"width", "height"}, customType = "Style")
    public void setStyle(VFNotificationBellView view, int index, Integer value) {
        if (index == 1) {
            propHeight = value;
        }
    }

    @Override
    public VFNotificationBellView createViewInstance(ThemedReactContext context) {
        return null;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }
}