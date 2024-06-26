import React from 'react';
import RNProfileAndroidComponent from '../../native/android/RNProfileAndroid.js';

const ProfileScreen = ({ navigation, route }) => {
  return (
    <RNProfileAndroidComponent
      style={{ height: '100%' }}
      userUUID={route.params.userUUID}
      presentationType={route.params.presentationType}
      darkMode={false}
      onCloseProfile={(event) => {
        navigation.goBack();
      }}
      onAuthNeeded={(event) => {
        navigation.navigate('Login');
      }}
    />
  );
};

export default ProfileScreen;
