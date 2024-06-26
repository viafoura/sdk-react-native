import React from 'react';
import RNProfileAndroidComponent from '../../native/android/RNProfileAndroid.js';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Screens } from '../../navigation/screens';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <RNProfileAndroidComponent
      style={{ height: '100%' }}
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
