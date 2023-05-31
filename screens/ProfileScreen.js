import RNProfileAndroidComponent from '../native/android/RNProfileAndroid.js';

const ProfileScreen = ({navigation, route}) => {
  return <RNProfileAndroidComponent
  style= {{ height: "100%" }}
  userUUID={route.params.userUUID}
  presentationType={route.params.presentationType}
  darkMode={false}
  onCloseProfile = {(event: any) => {
    navigation.goBack();
  }}
  onAuthNeeded = {(event: any) => {
    navigation.navigate('Login')
  }}>

  </RNProfileAndroidComponent>;
};

export default ProfileScreen;
