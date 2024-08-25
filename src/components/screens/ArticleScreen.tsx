import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { useState } from 'react';

import RNPreviewCommentsiOSComponent from '../../native/ios/RNPreviewCommentsiOS.js';
import RNPreviewCommentsAndroidComponent from '../../native/android/RNPreviewCommentsAndroid.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../../navigation/screens';

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
          if (event.containerId === route.params.containerId) {
            setCommentsHeight(event.newHeight);
          }
        }}
        onOpenProfile={(event: any) => {
          var object = {
            userUUID: event.userUUID,
            presentationType: event.presentationType ?? 'profile',
          };
          navigation.navigate(Screens.Profile, object);
        }}
        onArticlePressed={(event: any) => {
          // Get article data from 'event'
          navigation.navigate(Screens.Article, route.params);
        }}
        onNewComment={(event: any) => {
          var object = {
            containerId: route.params.containerId,
            articleTitle: route.params.articleTitle,
            articleDesc: route.params.articleDesc,
            articleUrl: route.params.articleUrl,
            articleThumbnailUrl: route.params.articleThumbnailUrl,
            newCommentActionType: event.actionType,
            content: event.content,
          };
          navigation.navigate(Screens.NewComment, object);
        }}
        onAuthNeeded={() => {
          navigation.navigate(Screens.Login);
        }}
      />
    </ScrollView>
  );
};

export default ArticleScreen;
