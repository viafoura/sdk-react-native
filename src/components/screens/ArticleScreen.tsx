import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { useState } from 'react';

import RNPreviewCommentsiOSComponent from '../../native/ios/RNPreviewCommentsiOS.js';
import RNPreviewCommentsAndroidComponent from '../../native/android/RNPreviewCommentsAndroid.js';
import { useNavigation, useRoute } from '@react-navigation/native';

const PreviewComments = Platform.select({
  ios: RNPreviewCommentsiOSComponent,
  android: RNPreviewCommentsAndroidComponent,
});

const ArticleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [commentsHeight, setCommentsHeight] = useState(2000);

  return (
    <ScrollView style={{ height: commentsHeight }}>
      <PreviewComments
        style={{ height: commentsHeight }}
        containerId={route.params.containerId}
        authorId={route.params.authorId}
        articleTitle={route.params.articleTitle}
        articleSubtitle={route.params.articleDesc}
        articleUrl={route.params.articleUrl}
        articleThumbnailUrl={route.params.articleThumbnailUrl}
        darkMode={false}
        onHeightChanged={(event) => {
          console.log(event.containerId);
          console.log(route.params.containerId);
          if (event.containerId === route.params.containerId) {
            setCommentsHeight(event.newHeight);
          }
        }}
        onOpenProfile={(event) => {
          var object = {
            userUUID: event.userUUID,
            presentationType: event.presentationType ?? 'profile',
          };
          navigation.navigate('Profile', object);
        }}
        onNewComment={(event) => {
          var object = {
            containerId: route.params.containerId,
            articleTitle: route.params.articleTitle,
            articleDesc: route.params.articleDesc,
            articleUrl: route.params.articleUrl,
            articleThumbnailUrl: route.params.articleThumbnailUrl,
            newCommentActionType: event.actionType,
            content: event.content,
          };
          navigation.navigate('NewComment', object);
        }}
        onAuthNeeded={(event) => {
          navigation.navigate('Login');
        }}
      />
    </ScrollView>
  );
};

export default ArticleScreen;
