import React from 'react';
import RNProfileAndroidComponent from '../../native/android/RNProfileAndroid.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../../navigation/screens';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: { height: '100%' },
});

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <RNProfileAndroidComponent
      style={styles.container}
      userUUID={route.params?.userUUID}
      presentationType={route.params?.presentationType}
      darkMode={false}
      onCloseProfile={() => {
        navigation.goBack();
      }}
      onAuthNeeded={() => {
        navigation.navigate(Screens.Login);
      }}
    />
  );
};

export default ProfileScreen;
