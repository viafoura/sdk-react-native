import React from 'react';
import { ScrollView, PixelRatio, Platform } from 'react-native';
import { useState } from "react";

import RNPreviewCommentsiOSComponent from '../native/ios/RNPreviewCommentsiOS.js';
import RNPreviewCommentsAndroidComponent from '../native/android/RNPreviewCommentsAndroid.js';

const PreviewComments = Platform.select({
  ios: RNPreviewCommentsiOSComponent,
  android: RNPreviewCommentsAndroidComponent
});

const HomeScreen = ({navigation, route}) => {
  const [commentsHeight, setCommentsHeight] = useState(1000)

  return <ScrollView>
  <PreviewComments
  style= {{ height: commentsHeight }}
  containerId={route.params.containerId}
  articleTitle={route.params.articleTitle}
  articleSubtitle={route.params.articleDesc}
  articleUrl={route.params.articleUrl}
  articleThumbnailUrl={route.params.articleThumbnailUrl}
  darkMode={false}
  onHeightChanged = {(event: any) => {
    if(Platform.OS === 'android'){
      setCommentsHeight(10000);
    } else {
      setCommentsHeight(event.newHeight);
    }
  }}
  onOpenProfile = {(event: any) => {
    var object = {
      userUUID: event.userUUID,
      presentationType: event.presentationType ?? "profile"
    };
    navigation.navigate('Profile', object)
  }}
  onNewComment = {(event: any) => {
    var object = {
      containerId: route.params.containerId,
      articleTitle: route.params.articleTitle,
      articleDesc: route.params.articleDesc,
      articleUrl: route.params.articleUrl,
      articleThumbnailUrl: route.params.articleThumbnailUrl,
      newCommentActionType: event.actionType,
      content: event.content
    };
    navigation.navigate('NewComment', object)
  }}
  onAuthNeeded = {(event: any) => {
    navigation.navigate('Login')
  }}>
  </PreviewComments>
  </ScrollView>
};


export default HomeScreen;
