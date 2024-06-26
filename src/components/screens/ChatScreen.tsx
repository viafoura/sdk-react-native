import React from 'react';
import { Platform } from 'react-native';
import { useWindowDimensions } from 'react-native';

import RNChatiOSComponent from '../../native/ios/RNChatiOS.js';
import RNChatAndroidComponent from '../../native/android/RNChatAndroid.js';

const Chat = Platform.select({
  ios: RNChatiOSComponent,
  android: RNChatAndroidComponent,
});

const ArticleScreen = ({ navigation, route }) => {
  let height = useWindowDimensions().height - 100; // Hook can be called only inside functional component, tthis is dynamic

  return (
    <Chat
      style={{ height: height }}
      containerId={route.params.containerId}
      authorId={route.params.authorId}
      articleTitle={route.params.articleTitle}
      articleSubtitle={route.params.articleDesc}
      articleUrl={route.params.articleUrl}
      articleThumbnailUrl={route.params.articleThumbnailUrl}
      darkMode={false}
      onOpenProfile={(event) => {
        var object = {
          userUUID: event.userUUID,
          presentationType: event.presentationType ?? 'profile',
        };
        navigation.navigate('Profile', object);
      }}
      onAuthNeeded={(event) => {
        navigation.navigate('Login');
      }}
    />
  );
};

export default ArticleScreen;
