import React from 'react';
import { Platform } from 'react-native';
import { useWindowDimensions } from 'react-native';

import RNChatiOSComponent from '../../native/ios/RNChatiOS.js';
import RNChatAndroidComponent from '../../native/android/RNChatAndroid.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../../navigation/screens';

const Chat = Platform.select({
  ios: RNChatiOSComponent,
  android: RNChatAndroidComponent,
});

const ArticleScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
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
      onOpenProfile={(event: any) => {
        var object = {
          userUUID: event.userUUID,
          presentationType: event.presentationType ?? 'profile',
        };
        navigation.navigate(Screens.Profile, object);
      }}
      onAuthNeeded={() => {
        navigation.navigate(Screens.Login);
      }}
    />
  );
};

export default ArticleScreen;
