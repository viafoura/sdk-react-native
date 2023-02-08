import React from 'react';
import { Button, View, StatusBar, ScrollView, PixelRatio } from 'react-native';
import {WebView} from 'react-native-webview';

this.state = {
    commentsHeight: 1000,
    userUUID: "00000000-0000-4000-8000-049e14c86e2c",
    presentationType: "feed"
};

import RNPreviewCommentsiOSComponent from './native/ios/RNPreviewCommentsiOS.js';
import RNPreviewCommentsAndroidComponent from './native/android/RNPreviewCommentsAndroid.js';
import RNProfileAndroidComponent from './native/android/RNProfileAndroid.js';
import RNNewCommentAndroidComponent from './native/android/RNNewCommentAndroid.js';

const PreviewComments = Platform.select({
  ios: RNPreviewCommentsiOSComponent,
  android: RNPreviewCommentsAndroidComponent
});

var AuthService = require('react-native').NativeModules.AuthService;

const doLogin = async () => {
    try {
      await AuthService.login("testing@viafoura.com", "Aaaaaaaa123")
    } catch (err) {
      alert(err)
    }
};

const doSignup = async () => {
    try {
      await AuthService.signup("Martin", "testing@viafoura.com", "ValidPassword123")
    } catch (err) {
      alert(err)
    }
};

const doSocialLogin = async () => {
    try {
      await AuthService.socialLogin("AKMSKMASMKFSOTUGSNWKOSODKWNRMKSNDS")
    } catch (err) {
      alert(err)
    }
};

const doCookieLogin = async () => {
    try {
      await AuthService.cookieLogin("AKMSKMASMKFSOTUGSNWKOSODKWNRMKSNDS", "cookie")
    } catch (err) {
      alert(err)
    }
};

const doOpenIDLogin = async () => {
    try {
      await AuthService.openIdLogin("AKMSKMASMKFSOTUGSNWKOSODKWNRMKSNDS")
    } catch (err) {
      alert(err)
    }
};

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <WebView scrollEnabled={false} source={{ uri: 'https://viafoura-mobile-demo.vercel.app/posts/here-are-what-media-companies-are-doing-with-covid-19-overload' }} />
        <PreviewComments
        style= {{ height: this.state.commentsHeight }}
        containerId={"101113541"}
        articleTitle={"Moving Staff to Cover the Coronavirus"}
        articleSubtitle={"Here Are What Media Companies Are Doing to Deal With COVID-19 Information Overload"}
        articleUrl={"https://viafoura-mobile-demo.vercel.app/posts/here-are-what-media-companies-are-doing-with-covid-19-overload"}
        articleThumbnailUrl={"https://www.datocms-assets.com/55856/1636753460-information-overload.jpg?crop=focalpoint&fit=crop&fm=webp&fp-x=0.86&fp-y=0.47&h=428&w=856"}
        onHeightChanged = {(event: any) => {
          this.state.commentsHeight = event.newHeight;
        }}
        onAuthNeeded = {(event: any) => {
          doLogin();
        }}>

        </PreviewComments>
        <RNProfileAndroidComponent
        style= {{ height: this.state.commentsHeight }}
        userUUID={this.state.userUUID}
        presentationType={this.state.presentationType}
        onAuthNeeded = {(event: any) => {
          doLogin();
        }}>

        </RNProfileAndroidComponent>
        <RNNewCommentAndroidComponent
        style= {{ height: this.state.commentsHeight }}
        containerId={"101113541"}
        articleTitle={"Moving Staff to Cover the Coronavirus"}
        articleSubtitle={"Here Are What Media Companies Are Doing to Deal With COVID-19 Information Overload"}
        articleUrl={"https://viafoura-mobile-demo.vercel.app/posts/here-are-what-media-companies-are-doing-with-covid-19-overload"}
        articleThumbnailUrl={"https://www.datocms-assets.com/55856/1636753460-information-overload.jpg?crop=focalpoint&fit=crop&fm=webp&fp-x=0.86&fp-y=0.47&h=428&w=856"}
        onHeightChanged = {(event: any) => {
          this.state.commentsHeight = event.newHeight;
        }}
        onAuthNeeded = {(event: any) => {
          doLogin();
        }}>

        </RNNewCommentAndroidComponent>
      </ScrollView>
    </View>
  );
};

export default App;
