import React from 'react';
import { Button, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import RNPreviewComments from './native/RNPreviewComments';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{flex: 1}}>
      <RNPreviewComments style={{flex: 1}} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
