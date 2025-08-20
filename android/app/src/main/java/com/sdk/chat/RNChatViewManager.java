package com.sdk.chat;

import android.content.Context;
import android.content.res.Resources;
import android.util.DisplayMetrics;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.annotations.ReactPropGroup;
import com.sdk.Utils;
import com.viafourasdk.src.fragments.base.VFFragment;
import com.viafourasdk.src.fragments.livechat.VFLiveChatFragment;
import com.viafourasdk.src.fragments.previewcomments.VFPreviewCommentsFragment;
import com.viafourasdk.src.interfaces.VFActionsInterface;
import com.viafourasdk.src.interfaces.VFCustomUIInterface;
import com.viafourasdk.src.interfaces.VFLayoutInterface;
import com.viafourasdk.src.model.local.VFActionData;
import com.viafourasdk.src.model.local.VFActionType;
import com.viafourasdk.src.model.local.VFArticleMetadata;
import com.viafourasdk.src.model.local.VFColors;
import com.viafourasdk.src.model.local.VFCustomViewType;
import com.viafourasdk.src.model.local.VFDefaultColors;
import com.viafourasdk.src.model.local.VFSettings;
import com.viafourasdk.src.model.local.VFSortType;
import com.viafourasdk.src.model.local.VFTheme;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Collections;
import java.util.Map;

public class RNChatViewManager extends ViewGroupManager<FrameLayout> implements VFCustomUIInterface, VFActionsInterface {

    public static final String REACT_CLASS = "RNChatAndroid";
    public final int COMMAND_CREATE = 1;
    public final int COMMAND_DESTROY = 2;
    ReactApplicationContext reactContext;

    int reactNativeViewId;
    private int propHeight;
    private String containerId;
    private String authorId;
    private boolean darkMode;
    private String articleUrl, articleTitle, articleDesc, articleThumbnailUrl;

    public RNChatViewManager(ReactApplicationContext reactContext) {
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
        return MapBuilder.of("create", COMMAND_CREATE, "destroy", COMMAND_DESTROY);
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

        switch (commandId) {
            case "create":
                createFragment(root, reactNativeViewId);
                break;
            case "destroy":
                destroyFragment(root, reactNativeViewId);
            default: {}
        }
    }

    public void destroyFragment(FrameLayout root, int reactNativeViewId) {
        FragmentActivity activity = (FragmentActivity) reactContext.getCurrentActivity();
        Fragment fragment = activity.getSupportFragmentManager().findFragmentByTag(String.valueOf(reactNativeViewId));

        if(fragment != null){
            activity.getSupportFragmentManager()
                    .beginTransaction()
                    .remove(fragment)
                    .commit();
        }
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
            VFColors colors = new VFColors(VFDefaultColors.getInstance().colorPrimaryDefault(null), VFDefaultColors.getInstance().colorPrimaryLightDefault(null));
            VFSettings settings = new VFSettings(colors);
            FragmentActivity activity = (FragmentActivity) reactContext.getCurrentActivity();
            final VFLiveChatFragment liveChatFragment = VFLiveChatFragment.newInstance(containerId, articleMetadata,  settings);
            liveChatFragment.setActionCallback(this);
            liveChatFragment.setCustomUICallback(this);
            if(activity != null && activity.findViewById(reactNativeViewId) != null) {
                activity.getSupportFragmentManager()
                        .beginTransaction()
                        .replace(reactNativeViewId, liveChatFragment, String.valueOf(reactNativeViewId))
                        .commit();
            }
            liveChatFragment.setTheme(darkMode ? VFTheme.dark : VFTheme.light);

        } catch (MalformedURLException | IllegalArgumentException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @ReactPropGroup(names = {"width", "height"}, customType = "Style")
    public void setStyle(FrameLayout view, int index, Integer value) {
        if (index == 1) {
            propHeight = value;
        }
    }

    public void setupLayout(View view) {
        Choreographer.getInstance().postFrameCallback(new Choreographer.FrameCallback() {
            @Override
            public void doFrame(long frameTimeNanos) {
                manuallyLayoutChildren(view);
                view.getViewTreeObserver().dispatchOnGlobalLayout();
                Choreographer.getInstance().postFrameCallback(this);
            }
        });
    }

    public static float convertDpToPixel(float dp, Context context){
        return dp * ((float) context.getResources().getDisplayMetrics().densityDpi / DisplayMetrics.DENSITY_DEFAULT);
    }

    public void manuallyLayoutChildren(View view) {
        int width = Resources.getSystem().getDisplayMetrics().widthPixels;
        int height = (int) convertDpToPixel(propHeight, reactContext);

        view.measure(
                View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));

        view.layout(0, 0, width, height);
    }

    @Override
    public void customizeView(VFTheme theme, VFCustomViewType customViewType, View view) {

    }

    @ReactProp(name = "authorId")
    public void setAuthorId(FrameLayout view, String authorId) {
        this.authorId = authorId;
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

    @ReactProp(name = "darkMode")
    public void setDarkMode(FrameLayout view, Boolean darkMode) {
        this.darkMode = darkMode;
    }

    @Override
    public void onNewAction(VFActionType actionType, VFActionData action) {
        if(actionType == VFActionType.openProfilePressed){
            WritableMap map = Arguments.createMap();
            if(action.getOpenProfileAction().presentationType != null){
                map.putString("presentationType", action.getOpenProfileAction().presentationType.toString());
            }
            map.putString("userUUID", action.getOpenProfileAction().userUUID.toString());
            Utils.sendDataToJS(reactContext, "onOpenProfile", map);
        } else if(actionType == VFActionType.authPressed){
            WritableMap map = Arguments.createMap();
            map.putBoolean("requireLogin", true);
            Utils.sendDataToJS(reactContext, "onAuthNeeded", map);
        }
    }
}
