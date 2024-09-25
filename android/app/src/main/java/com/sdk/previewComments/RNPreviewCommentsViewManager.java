package com.sdk.previewComments;

import android.content.Context;
import android.content.res.Resources;
import android.util.DisplayMetrics;
import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
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
import com.sdk.Utils;
import com.viafourasdk.src.fragments.base.VFFragment;
import com.viafourasdk.src.fragments.previewcomments.VFPreviewCommentsFragment;
import com.viafourasdk.src.interfaces.VFActionsInterface;
import com.viafourasdk.src.interfaces.VFCustomUIInterface;
import com.viafourasdk.src.interfaces.VFLayoutInterface;
import com.viafourasdk.src.interfaces.VFLoginInterface;
import com.viafourasdk.src.model.local.VFActionData;
import com.viafourasdk.src.model.local.VFActionType;
import com.viafourasdk.src.model.local.VFArticleMetadata;
import com.viafourasdk.src.model.local.VFAuthPromptType;
import com.viafourasdk.src.model.local.VFColors;
import com.viafourasdk.src.model.local.VFCustomViewType;
import com.viafourasdk.src.model.local.VFDefaultColors;
import com.viafourasdk.src.model.local.VFSettings;
import com.viafourasdk.src.model.local.VFSortType;
import com.viafourasdk.src.model.local.VFTheme;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class RNPreviewCommentsViewManager extends ViewGroupManager<FrameLayout> implements VFLoginInterface, VFCustomUIInterface, VFActionsInterface, VFLayoutInterface {

    public static final String REACT_CLASS = "RNPreviewCommentsAndroid";
    public final int COMMAND_CREATE = 1;
    public final int COMMAND_DESTROY = 2;
    ReactApplicationContext reactContext;

    private String containerId;
    private String authorId;
    private boolean darkMode;
    private String articleUrl, articleTitle, articleDesc, articleThumbnailUrl;

    public RNPreviewCommentsViewManager(ReactApplicationContext reactContext) {
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
        int reactNativeViewId = args.getInt(0);
        int commandIdInt = Integer.parseInt(commandId);

        switch (commandIdInt) {
            case COMMAND_CREATE:
                createFragment(root, reactNativeViewId);
                break;
            case COMMAND_DESTROY:
                destroyFragment(root, reactNativeViewId);
            default: {}
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

    public void createFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
        setupLayout(parentView);

        try {
            VFArticleMetadata articleMetadata = new VFArticleMetadata(new URL(articleUrl), articleTitle, articleDesc, new URL(articleThumbnailUrl));
            VFColors colors = new VFColors(VFDefaultColors.getInstance().colorPrimaryDefault(null), VFDefaultColors.getInstance().colorPrimaryLightDefault(null));
            VFSettings settings = new VFSettings(colors);
            FragmentActivity activity = (FragmentActivity) reactContext.getCurrentActivity();
            final VFPreviewCommentsFragment previewCommentsFragment = VFPreviewCommentsFragment.newInstance(containerId, articleMetadata, this, settings, 10, VFSortType.newest);
            previewCommentsFragment.setActionCallback(this);
            previewCommentsFragment.setLayoutCallback(this);
            previewCommentsFragment.setCustomUICallback(this);
            
            if(activity != null && activity.findViewById(reactNativeViewId) != null){
                activity.getSupportFragmentManager()
                        .beginTransaction()
                        .replace(reactNativeViewId, previewCommentsFragment, String.valueOf(reactNativeViewId))
                        .commit();
            }
            previewCommentsFragment.setTheme(darkMode ? VFTheme.dark : VFTheme.light);

            if(authorId != null){
                previewCommentsFragment.setAuthorIds(Collections.singletonList(authorId));
            }
        } catch (MalformedURLException | IllegalArgumentException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
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

    public void manuallyLayoutChildren(View view) {
        view.measure(
                View.MeasureSpec.makeMeasureSpec(view.getWidth(), View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(view.getHeight(), View.MeasureSpec.EXACTLY));

        view.layout(view.getLeft(), view.getTop(), view.getRight(), view.getBottom());
    }

    @Override
    public void startLogin() {
        WritableMap map = Arguments.createMap();
        map.putBoolean("requireLogin", true);
        Utils.sendDataToJS(reactContext, "onAuthNeeded", map);
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
        if(actionType == VFActionType.writeNewCommentPressed){
            WritableMap map = Arguments.createMap();
            if(action.getNewCommentAction().content != null){
                map.putString("content", action.getNewCommentAction().content.toString());
            }
            map.putString("actionType", action.getNewCommentAction().type.toString());
            Utils.sendDataToJS(reactContext, "onNewComment", map);
        } else if(actionType == VFActionType.openProfilePressed){
            WritableMap map = Arguments.createMap();
            if(action.getOpenProfileAction().presentationType != null){
                map.putString("presentationType", action.getOpenProfileAction().presentationType.toString());
            }
            map.putString("userUUID", action.getOpenProfileAction().userUUID.toString());
            Utils.sendDataToJS(reactContext, "onOpenProfile", map);
        } else if(actionType == VFActionType.trendingArticlePressed){
            WritableMap map = Arguments.createMap();
            map.putString("articleUrl", action.getTrendingPressedAction().articleMetadata.getUrl().toString());
            map.putString("containerId", action.getTrendingPressedAction().containerId);
            Utils.sendDataToJS(reactContext, "onArticlePressed", map);
        }
    }

    @Override
    public void containerHeightUpdated(VFFragment fragment, String containerId, int height) {
        WritableMap map = Arguments.createMap();
        map.putInt("newHeight", height);
        map.putString("containerId", containerId);
        Utils.sendDataToJS(reactContext, "onHeightChanged", map);
    }
}
