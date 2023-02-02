import React from 'react';
import { Button, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import RNPreviewCommentsComponent from './native/RNPreviewComments.js';
import {WebView} from 'react-native-webview';

this.state = {
    commentsHeight: 1000
};

var AuthService = require('react-native').NativeModules.AuthService;

const doLogin = async () => {
    try {
      await AuthService.logout()
    } catch (err) {
      alert(err)
    }
};

doLogin();


const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <WebView style={{ height: 1000 }} source={{ uri: 'https://viafoura-mobile-demo.vercel.app/posts/here-are-what-media-companies-are-doing-with-covid-19-overload' }} />
        <RNPreviewCommentsComponent
        style= {{ height: this.state.commentsHeight, flex: 1 }}
        onHeightChanged ={(event: any) => {
          this.state.commentsHeight = event.newHeight;
        }}
        onAuthNeeded = {(event: any) => {

        }}
        containerId={"101113541"} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
