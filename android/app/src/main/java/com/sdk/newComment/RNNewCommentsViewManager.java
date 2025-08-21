package com.sdk.newComment;

import android.content.res.Resources;
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
import com.sdk.Utils;
import com.viafourasdk.src.fragments.base.VFFragment;
import com.viafourasdk.src.fragments.newcomment.VFNewCommentFragment;
import com.viafourasdk.src.fragments.newcomment.VFNewCommentFragmentBuilder;
import com.viafourasdk.src.interfaces.VFActionsInterface;
import com.viafourasdk.src.interfaces.VFCustomUIInterface;
import com.viafourasdk.src.interfaces.VFLayoutInterface;
import com.viafourasdk.src.model.local.VFActionData;
import com.viafourasdk.src.model.local.VFActionType;
import com.viafourasdk.src.model.local.VFArticleMetadata;
import com.viafourasdk.src.model.local.VFColors;
import com.viafourasdk.src.model.local.VFCustomViewType;
import com.viafourasdk.src.model.local.VFDefaultColors;
import com.viafourasdk.src.model.local.VFNewCommentAction;
import com.viafourasdk.src.model.local.VFSettings;
import com.viafourasdk.src.model.local.VFTheme;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.UUID;

public class RNNewCommentsViewManager extends ViewGroupManager<FrameLayout> implements VFCustomUIInterface, VFActionsInterface, VFLayoutInterface {
    public static final String REACT_CLASS = "RNNewCommentAndroid";
    public final int COMMAND_CREATE = 1;
    public final int COMMAND_DESTROY = 2;
    ReactApplicationContext reactContext;
    public int reactNativeViewId = 0;

    private String newCommentActionType;
    private String content;
    private String containerId;
    private String syndicationKey;
    private boolean darkMode;
    private String articleUrl, articleTitle, articleDesc, articleThumbnailUrl;
    public RNNewCommentsViewManager(ReactApplicationContext reactContext) {
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    public FrameLayout createViewInstance(ThemedReactContext reactContext) {
        return new FrameLayout(reactContext);
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("create", COMMAND_CREATE);
    }

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
            default: {}
        }
    }

    @Override
    public void onDropViewInstance(@NonNull FrameLayout view) {
        super.onDropViewInstance(view);

        destroyFragment(reactNativeViewId);
    }

    public void destroyFragment(int reactNativeViewId) {
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

            VFNewCommentAction.VFNewCommentActionType actionType = null;
            if(newCommentActionType.equals("create")){
                actionType = VFNewCommentAction.VFNewCommentActionType.create;
            } else if(newCommentActionType.equals("edit")){
                actionType = VFNewCommentAction.VFNewCommentActionType.edit;
            } else if(newCommentActionType.equals("reply")){
                actionType = VFNewCommentAction.VFNewCommentActionType.reply;
            }

            VFNewCommentAction action = new VFNewCommentAction(actionType);

            if(content != null){
                action.content = UUID.fromString(content);
            }

            final VFNewCommentFragment newCommentFragment = new VFNewCommentFragmentBuilder(action, containerId, articleMetadata, settings)
                    .syndicationKey(syndicationKey)
                    .build();
            newCommentFragment.setActionCallback(this);
            newCommentFragment.setCustomUICallback(this);
            if(activity != null && activity.findViewById(reactNativeViewId) != null) {
                activity.getSupportFragmentManager()
                        .beginTransaction()
                        .replace(reactNativeViewId, newCommentFragment, String.valueOf(reactNativeViewId))
                        .commit();
            }
            newCommentFragment.setTheme(darkMode ? VFTheme.dark : VFTheme.light);
        } catch (MalformedURLException | IllegalArgumentException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    @ReactProp(name = "content")
    public void setContent(FrameLayout view, String content) {
        this.content = content;
    }

    @ReactProp(name = "newCommentActionType")
    public void setPresentationType(FrameLayout view, String newCommentActionType) {
        this.newCommentActionType = newCommentActionType;
    }

    @ReactProp(name = "containerId")
    public void setContainerId(FrameLayout view, String containerId) {
        this.containerId = containerId;
    }

    @ReactProp(name = "syndicationKey")
    public void setSyndicationKey(FrameLayout view, String containerId) {
        this.syndicationKey = syndicationKey;
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
        // propWidth and propHeight coming from react-native props
        int width = Resources.getSystem().getDisplayMetrics().widthPixels;
        int height = view.getHeight();

        view.measure(
                View.MeasureSpec.makeMeasureSpec(width, View.MeasureSpec.EXACTLY),
                View.MeasureSpec.makeMeasureSpec(height, View.MeasureSpec.EXACTLY));

        view.layout(0, 0, width, height);
    }

    @Override
    public void onNewAction(VFActionType actionType, VFActionData action) {
        if(actionType == VFActionType.closeNewCommentPressed){
            WritableMap map = Arguments.createMap();
            Utils.sendDataToJS(reactContext, "onCloseNewComment", map);
        } else if(actionType == VFActionType.authPressed){
            WritableMap map = Arguments.createMap();
            map.putBoolean("requireLogin", true);
            Utils.sendDataToJS(reactContext, "onAuthNeeded", map);
        }
    }

    @Override
    public void customizeView(VFTheme theme, VFCustomViewType customViewType, View view) {

    }

    @Override
    public void containerHeightUpdated(VFFragment fragment, String containerId, int height) {

    }
}
