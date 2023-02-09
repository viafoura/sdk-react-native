package com.sdk;

import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class Utils {
    public static void sendDataToJS(ReactContext reactContext, String eventName, WritableMap data){
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, data);
    }
}
