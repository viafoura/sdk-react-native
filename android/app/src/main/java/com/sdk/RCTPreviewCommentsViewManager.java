package com.sdk;

import android.content.res.Resources;
import android.graphics.Color;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.viafourasdk.src.fragments.base.VFFragment;
import com.viafourasdk.src.fragments.previewcomments.VFPreviewCommentsFragment;
import com.viafourasdk.src.interfaces.VFActionsInterface;
import com.viafourasdk.src.interfaces.VFCustomUIInterface;
import com.viafourasdk.src.interfaces.VFLayoutInterface;
import com.viafourasdk.src.interfaces.VFLoginInterface;
import com.viafourasdk.src.model.local.VFActionData;
import com.viafourasdk.src.model.local.VFActionType;
import com.viafourasdk.src.model.local.VFArticleMetadata;
import com.viafourasdk.src.model.local.VFColors;
import com.viafourasdk.src.model.local.VFCustomViewType;
import com.viafourasdk.src.model.local.VFDefaultColors;
import com.viafourasdk.src.model.local.VFSettings;
import com.viafourasdk.src.model.local.VFSortType;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class RCTPreviewCommentsViewManager extends ViewGroupManager<FrameLayout> implements VFLoginInterface, VFCustomUIInterface, VFActionsInterface, VFLayoutInterface {

    public static final String REACT_CLASS = "RNPreviewCommentsAndroid";
    public final int COMMAND_CREATE = 1;
    ReactApplicationContext reactContext;

    int reactNativeViewId;

    private int containerHeight = 100;
    private String containerId;
    private String articleUrl, articleTitle, articleDesc, articleThumbnailUrl;

    public RCTPreviewCommentsViewManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    /**
     * Return a FrameLayout which will later hold the Fragment
     */
    @Override
    public FrameLayout createViewInstance(ThemedReactContext reactContext) {
        return new FrameLayout(reactContext);
    }

    /**
     * Map the "create" command to an integer
     */
    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("create", COMMAND_CREATE);
    }

    /**
     * Handle "create" command (called from JS) and call createFragment method
     */
    @Override
    public void receiveCommand(
            @NonNull FrameLayout root,
            String commandId,
            @Nullable ReadableArray args
    ) {
        super.receiveCommand(root, commandId, args);
        reactNativeViewId = args.getInt(0);
        int commandIdInt = Integer.parseInt(commandId);

        switch (commandIdInt) {
            case COMMAND_CREATE:
                createFragment(root, reactNativeViewId);
                break;
            default: {}
        }
    }

    public void sendDataToJS(String eventName, WritableMap data){
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, data);
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return super.getExportedCustomDirectEventTypeConstants();
    }

    @Nullable
    @Override
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
                .build();
    }

    /**
     * Replace your React Native view with a custom fragment
     */
    public void createFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
        setupLayout(parentView);

        try {
            VFArticleMetadata articleMetadata = new VFArticleMetadata(new URL(articleUrl), articleTitle, articleDesc, new URL(articleThumbnailUrl));
            VFColors colors = new VFColors(VFDefaultColors.getInstance().colorPrimaryDefault, VFDefaultColors.getInstance().colorPrimaryLightDefault, VFDefaultColors.getInstance().colorBackgroundDefault);
            VFSettings settings = new VFSettings(colors);
            FragmentActivity activity = (FragmentActivity) reactContext.getCurrentActivity();
            final VFPreviewCommentsFragment previewCommentsFragment = VFPreviewCommentsFragment.newInstance(activity.getApplication(), containerId, articleMetadata, this, settings, 10, VFSortType.mostLiked);
            previewCommentsFragment.setActionCallback(this);
            previewCommentsFragment.setLayoutCallback(this);
            previewCommentsFragment.setCustomUICallback(this);
            activity.getSupportFragmentManager()
                    .beginTransaction()
                    .replace(reactNativeViewId, previewCommentsFragment, String.valueOf(reactNativeViewId))
                    .commit();

            startLogin();
        } catch (MalformedURLException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    public void setupLayout(View view) {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }

    /**
     * Layout all children properly
     */


    @Override
    public void startLogin() {
        WritableMap map = Arguments.createMap();
        map.putBoolean("requireLogin", true);
        sendDataToJS("onAuthNeeded", map);
    }

    @Override
    public void customizeView(VFCustomViewType customViewType, View view) {

    }

    @ReactProp(name = "containerId")
    public void setContainerId(FrameLayout view, String containerId) {
        this.containerId = containerId;
    }

    @ReactProp(name = "articleTitle")
    public void setArticleTitle(FrameLayout view, String articleTitle) {
        this.articleTitle = articleTitle;
    }

    @ReactProp(name = "articleSubtitle")
    public void setArticleSubtitle(FrameLayout view, String articleSubtitle) {
        this.articleDesc = articleSubtitle;
    }

    @ReactProp(name = "articleUrl")
    public void setArticleUrl(FrameLayout view, String articleUrl) {
        this.articleUrl = articleUrl;
    }

    @ReactProp(name = "articleThumbnailUrl")
    public void setArticleThumbnailUrl(FrameLayout view, String articleThumbnailUrl) {
        this.articleThumbnailUrl = articleThumbnailUrl;
    }

    @Override
    public void onNewAction(VFActionType actionType, VFActionData action) {
        if(actionType == VFActionType.writeNewCommentPressed){

        } else if(actionType == VFActionType.openProfilePressed){

        }
    }

    @Override
    public void containerHeightUpdated(VFFragment fragment, int height) {
        containerHeight = height;
        WritableMap map = Arguments.createMap();
        map.putInt("newHeight", height);
        sendDataToJS("onHeightChanged", map);
    }
}