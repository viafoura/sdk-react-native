import React from 'react';
import { ScrollView, Button, Platform } from 'react-native';

import RNBelliOS from '../../native/ios/RNBelliOS.js';
import RNBellAndroid from '../../native/android/RNBellAndroid.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../../navigation/screens';

const Bell = Platform.select({
  ios: RNBelliOS,
  android: RNBellAndroid,
});

const ArticleListScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <ScrollView>
      <Button
        title="Article 1"
        onPress={() =>
          navigation.navigate(Screens.Article, route.params.articles[0])
        }
      />
      <Button
        title="Article 2"
        onPress={() =>
          navigation.navigate(Screens.Article, route.params.articles[1])
        }
      />
      <Button
        title="Chat"
        onPress={() =>
          navigation.navigate(Screens.Chat, route.params.articles[1])
        }
      />
    </ScrollView>
  );
};

export default ArticleListScreen;
