import React from 'react';

import RNNewCommentAndroidComponent from '../../native/android/RNNewCommentAndroid.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../../navigation/screens';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { height: '100%' },
});

const NewCommentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <RNNewCommentAndroidComponent
      style={styles.container}
      containerId={route.params?.containerId}
      articleTitle={route.params?.articleTitle}
      articleSubtitle={route.params?.articleDesc}
      articleUrl={route.params?.articleUrl}
      darkMode={true}
      articleThumbnailUrl={route.params?.articleThumbnailUrl}
      newCommentActionType={route.params?.newCommentActionType}
      content={route.params?.content}
      onCloseNewComment={() => {
        navigation.goBack();
      }}
      onAuthNeeded={() => {
        navigation.navigate(Screens.Login);
      }}
    />
  );
};

export default NewCommentScreen;
