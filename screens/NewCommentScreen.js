import React from 'react';

import RNNewCommentAndroidComponent from '../native/android/RNNewCommentAndroid.js';

const NewCommentScreen = ({navigation, route}) => {
  return <RNNewCommentAndroidComponent
  style= {{ height: "100%" }}
  containerId={route.params.containerId}
  articleTitle={route.params.articleTitle}
  articleSubtitle={route.params.articleDesc}
  articleUrl={route.params.articleUrl}
  darkMode={true}
  articleThumbnailUrl={route.params.articleThumbnailUrl}
  newCommentActionType={route.params.newCommentActionType}
  content={route.params.content}
  onCloseNewComment = {(event: any) => {
    navigation.goBack();
  }}
  onAuthNeeded = {(event: any) => {
    navigation.navigate('Login')
  }}>

  </RNNewCommentAndroidComponent>
};


export default NewCommentScreen;
