import React from 'react';
import { ScrollView, Button, Platform, View } from 'react-native';

import RNBelliOS from '../native/ios/RNBelliOS.js';
import RNBellAndroid from '../native/android/RNBellAndroid.js';

const Bell = Platform.select({
  ios: RNBelliOS,
  android: RNBellAndroid,
});


const ArticleListScreen = ({navigation, route}) => {
  return <ScrollView>
  <Button title="Article 1" onPress={  () =>
    navigation.navigate('Article', route.params.articles[0])
   }/>
  <Button title="Article 2" onPress={ () =>  navigation.navigate('Article', route.params.articles[1]) }/>
  <Button title="Chat" onPress={ () =>  navigation.navigate('Chat', route.params.articles[1]) }/>
  </ScrollView>
};


export default ArticleListScreen;
