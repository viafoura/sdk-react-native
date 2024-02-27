import React from 'react';
import { ScrollView, Button } from 'react-native';

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
