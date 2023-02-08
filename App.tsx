import React from 'react';
import { Button, View, StatusBar, ScrollView, PixelRatio } from 'react-native';
import {WebView} from 'react-native-webview';

this.state = {
    commentsHeight: 1000
};

import RNPreviewCommentsiOSComponent from './native/RNPreviewCommentsiOS.js';
import RNPreviewCommentsAndroidComponent from './native/RNPreviewCommentsAndroid.js';

const PreviewComments = Platform.select({
  ios: RNPreviewCommentsiOSComponent,
  android: RNPreviewCommentsAndroidComponent
});

var AuthService = require('react-native').NativeModules.AuthService;

const doLogin = async () => {
    try {
      await AuthService.login("martin.desimone@viafoura.com", "Aaaaaaaa123")
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
      </ScrollView>
    </View>
  );
};

export default App;
