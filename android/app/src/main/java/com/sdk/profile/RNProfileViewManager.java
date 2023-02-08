package com.sdk.profile;

import android.view.Choreographer;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.FragmentActivity;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.viafourasdk.src.fragments.base.VFFragment;
import com.viafourasdk.src.fragments.previewcomments.VFPreviewCommentsFragment;
import com.viafourasdk.src.fragments.profile.VFProfileFragment;
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
import com.viafourasdk.src.model.local.VFProfilePresentationType;
import com.viafourasdk.src.model.local.VFSettings;
import com.viafourasdk.src.model.local.VFSortType;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Map;
import java.util.UUID;

public class RNProfileViewManager extends ViewGroupManager<FrameLayout> implements VFLoginInterface, VFCustomUIInterface, VFActionsInterface, VFLayoutInterface {
    public static final String REACT_CLASS = "RNProfileAndroid";
    public final int COMMAND_CREATE = 1;
    ReactApplicationContext reactContext;

    int reactNativeViewId;

    UUID userUUID;
    String presentationType;
    public RNProfileViewManager(ReactApplicationContext reactContext) {
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
        int commandIdInt = Integer.parseInt(commandId);

        switch (commandIdInt) {
            case COMMAND_CREATE:
                createFragment(root, reactNativeViewId);
                break;
            default: {}
        }
    }

    public void createFragment(FrameLayout root, int reactNativeViewId) {
        ViewGroup parentView = (ViewGroup) root.findViewById(reactNativeViewId);
        setupLayout(parentView);

        VFColors colors = new VFColors(VFDefaultColors.getInstance().colorPrimaryDefault, VFDefaultColors.getInstance().colorPrimaryLightDefault, VFDefaultColors.getInstance().colorBackgroundDefault);
        VFSettings settings = new VFSettings(colors);
        FragmentActivity activity = (FragmentActivity) reactContext.getCurrentActivity();
        VFProfilePresentationType profilePresentationType = null;
        if(presentationType.equals("profile")){
            profilePresentationType = VFProfilePresentationType.profile;
        } else if(presentationType.equals("feed")){
            profilePresentationType = VFProfilePresentationType.feed;
        }

        final VFProfileFragment profileFragment = VFProfileFragment.newInstance(activity.getApplication(), userUUID, profilePresentationType, this, settings);
        profileFragment.setActionCallback(this);
        profileFragment.setCustomUICallback(this);
        activity.getSupportFragmentManager()
                .beginTransaction()
                .replace(reactNativeViewId, profileFragment, String.valueOf(reactNativeViewId))
                .commit();

        startLogin();
    }

    @ReactProp(name = "userUUID")
    public void setUserUUID(FrameLayout view, String userUUID) {
        this.userUUID = UUID.fromString(userUUID);
    }

    @ReactProp(name = "presentationType")
    public void setPresentationType(FrameLayout view, String presentationType) {
        this.presentationType = presentationType;
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

    @Override
    public void onNewAction(VFActionType actionType, VFActionData action) {
        if(actionType == VFActionType.closeProfilePressed){

        }
    }

    @Override
    public void customizeView(VFCustomViewType customViewType, View view) {

    }

    @Override
    public void containerHeightUpdated(VFFragment fragment, int height) {

    }

    @Override
    public void startLogin() {

    }
}
