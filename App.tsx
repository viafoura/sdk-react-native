import React from 'react';
import { Button, View, Text, StatusBar, ScrollView, PixelRatio } from 'react-native';
import {WebView} from 'react-native-webview';

this.state = {
    commentsHeight: 1000,
};

import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen.js';
import NewCommentScreen from './screens/NewCommentScreen.js';
import LoginScreen from './screens/LoginScreen.js';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" initialParams={{
          containerId: "101113541",
          articleTitle: "Moving Staff to Cover the Coronavirus",
          articleDesc: "Here Are What Media Companies Are Doing to Deal With COVID-19 Information Overload",
          articleUrl: "https://viafoura-mobile-demo.vercel.app/posts/here-are-what-media-companies-are-doing-with-covid-19-overload",
          articleThumbnailUrl: "https://www.datocms-assets.com/55856/1636753460-information-overload.jpg?crop=focalpoint&fit=crop&fm=webp&fp-x=0.86&fp-y=0.47&h=428&w=856"
        }} component={HomeScreen} />
        <Stack.Screen name="NewComment" component={NewCommentScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
