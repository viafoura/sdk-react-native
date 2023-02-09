import RNProfileAndroidComponent from '../native/android/RNProfileAndroid.js';

const ProfileScreen = ({navigation, route}) => {
  return <RNProfileAndroidComponent
  style= {{ height: this.state.commentsHeight }}
  userUUID={route.params.userUUID}
  presentationType={route.params.presentationType}
  onCloseProfile = {(event: any) => {
    navigation.goBack();
  }}
  onAuthNeeded = {(event: any) => {
    navigation.navigate('Login')
  }}>

  </RNProfileAndroidComponent>;
};

export default ProfileScreen;
